// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar la función loadEmployees.
document.addEventListener('DOMContentLoaded', loadEmployees);

function loadEmployees() {
    // Realiza una solicitud GET a la API para obtener todos los empleados.
    fetch('http://localhost:5000/employee/employees')
        .then(response => response.json())  // Convierte la respuesta en formato JSON.
        .then(employees => {
            // Itera sobre la lista de empleados y agrega cada uno a la tabla.
            employees.forEach(employee => addEmployeeToTable(employee));
        })
        .catch(error => console.error('Error:', error));  // Muestra errores en la consola.
}

function addEmployeeToTable(employee) {
    // Obtiene la tabla de empleados por su ID y selecciona el cuerpo de la tabla (tbody).
    const table = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    // Inserta una nueva fila en el tbody.
    const row = table.insertRow();

    // Agrega el HTML de la fila con los datos del empleado.
    row.innerHTML = `
        <td>${employee.employee_id}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>
            <button class="edit" onclick="updateEmployee(${employee.employee_id})">Edit</button>
            <button class="delete" onclick="deleteEmployee(${employee.employee_id})">Delete</button>
        </td>
    `;
}

function updateEmployee(employeeId) {
    // Solicita al usuario que ingrese los nuevos datos para el empleado.
    const name = prompt('Ingrese el nuevo nombre:');
    const email = prompt('Ingrese el nuevo email:');
    const phone = prompt('Ingrese el nuevo teléfono:');

    // Verifica que se hayan ingresado todos los datos.
    if (name && email && phone) {
        // Realiza una solicitud PUT a la API para actualizar el empleado con los nuevos datos.
        fetch(`http://localhost:5000/employee/employees/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // Especifica que los datos se envían en formato JSON.
            },
            body: JSON.stringify({ name, email, phone })  // Convierte los datos del empleado en una cadena JSON.
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            location.reload();  // Recarga la página para reflejar los cambios.
            return response.json();  // Convierte la respuesta en JSON.
        })
        .then(data => {
            if (data.error) {
                alert('Empleado no encontrado');  // Muestra un error si no se encuentra el empleado.
            } else {
                alert(`Empleado actualizado:\nNombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}`);
                // Actualiza la tabla después de la actualización.
                fetchEmployees(); 
            }
        })
    } else {
        alert('Debe ingresar nombre, email y teléfono válidos.');  // Muestra un mensaje si faltan datos.
    }
}

function deleteEmployee(employeeId) {
    // Realiza una solicitud DELETE a la API para eliminar el empleado.
    fetch(`http://localhost:5000/employee/employees/${employeeId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 204) {
            // Si la eliminación es exitosa, encuentra y elimina la fila del empleado en la tabla.
            const rows = document.querySelectorAll('#employeeTable tbody tr');

            rows.forEach(row => {
                const idCell = row.cells[0]; // Asume que el ID está en la primera celda.
                if (idCell.textContent.trim() === employeeId.toString()) {
                    row.remove();  // Elimina la fila.
                    alert('Empleado eliminado correctamente');
                }
            });
        } else {
            alert('Error al eliminar empleado');  // Muestra un error si la eliminación falla.
        }
    })
    .catch(error => console.error('Error:', error));  // Muestra errores en la consola.
}

const handleAddEmployee = function(event) {
    event.preventDefault();  // Previene el comportamiento predeterminado del formulario (recarga de la página).

    // Obtiene los valores de los campos del formulario.
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Realiza una solicitud POST a la API para agregar un nuevo empleado.
    fetch('http://localhost:5000/employee/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Especifica que los datos se envían en formato JSON.
        },
        body: JSON.stringify({ name, email, phone })  // Convierte los datos del nuevo empleado en una cadena JSON.
    })
    .then(response => response.json())  // Convierte la respuesta en JSON.
    .then(data => {
        if (data.employee_id) {
            addEmployeeToTable(data);  // Agrega el nuevo empleado a la tabla.
            document.getElementById('employeeForm').reset();  // Reinicia el formulario.
        } else {
            alert('Error adding employee');  // Muestra un mensaje si hay un error al agregar.
        }
    })
    .catch(error => console.error('Error:', error));  // Muestra errores en la consola.
};

// Añade un evento al formulario de empleados para manejar la adición de un nuevo empleado.
document.getElementById('employeeForm').addEventListener('submit', handleAddEmployee);





from flask import jsonify  # Importa jsonify de Flask para convertir respuestas en formato JSON.

def employee_response(employee):
    # Crea un diccionario que representa la respuesta JSON.
    response = {
        'status': 'success',  # Indica que la solicitud fue exitosa.
        'employee': {
            'name': employee.name,    # Nombre del empleado.
            'email': employee.email,  # Correo electrónico del empleado.
            'phone': employee.phone   # Teléfono del empleado.
        }
    }
    # Convierte el diccionario a una respuesta JSON y la devuelve.
    return jsonify(response)



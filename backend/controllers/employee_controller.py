from flask import Blueprint, request, jsonify  # Importa módulos de Flask para definir rutas, manejar solicitudes y formatear respuestas en JSON.
from services.employee_service import EmployeeService  # Importa el servicio de empleados, que contiene la lógica de negocio.

# Define un blueprint para modularizar las rutas relacionadas con empleados.
employee_blueprint = Blueprint('employee', __name__)
# Crea una instancia del servicio de empleados.
employee_service = EmployeeService()

@employee_blueprint.route('/employees', methods=['GET'])
def get_employees():
    # Obtiene todos los empleados del servicio.
    employees = employee_service.get_all_employees()
    # Devuelve una lista de empleados serializados en formato JSON.
    return jsonify([employee.serialize() for employee in employees])

@employee_blueprint.route('/employees', methods=['POST'])
def create_employee():
    # Obtiene los datos JSON de la solicitud.
    data = request.json
    # Extrae el nombre, correo electrónico y teléfono de los datos.
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    # Verifica que el nombre, correo electrónico y teléfono no estén vacíos.
    if not name or not email or not phone:
        # Si falta algún campo, devuelve un error 400.
        return jsonify({'error': 'Missing required fields'}), 400

    # Crea un nuevo empleado utilizando el servicio de empleados.
    employee = employee_service.create_employee(name, email, phone)
    # Devuelve el nuevo empleado en formato JSON con un código de estado 201.
    return jsonify(employee.serialize()), 201

@employee_blueprint.route('/employees/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
    # Obtiene un empleado por su ID del servicio.
    employee = employee_service.get_employee(employee_id)
    if employee:
        # Si se encuentra el empleado, lo devuelve en formato JSON.
        return jsonify(employee.serialize())
    else:
        # Si no se encuentra el empleado, devuelve un error 404.
        return jsonify({'error': 'Employee not found'}), 404

@employee_blueprint.route('/employees/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    # Obtiene los datos JSON de la solicitud.
    data = request.json
    # Extrae el nombre, correo electrónico y teléfono de los datos.
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    # Verifica que el nombre, correo electrónico y teléfono no estén vacíos.
    if not name or not email or not phone:
        # Si falta algún campo, devuelve un error 400.
        return jsonify({'error': 'Missing required fields'}), 400

    # Actualiza el empleado utilizando el servicio de empleados.
    updated = employee_service.update_employee(employee_id, name, email, phone)
    if updated:
        # Si la actualización fue exitosa, obtiene el empleado actualizado y lo devuelve en formato JSON.
        employee = employee_service.get_employee(employee_id)
        return jsonify(employee.serialize()), 200
    else:
        # Si no se encuentra el empleado, devuelve un error 404.
        return jsonify({'error': 'Employee not found'}), 404


@employee_blueprint.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    # Elimina el empleado utilizando el servicio de empleados.
    deleted = employee_service.delete_employee(employee_id)
    if deleted:
        # Si la eliminación fue exitosa, devuelve un código de estado 204 sin contenido.
        return '', 204
    else:
        # Si no se encuentra el empleado, devuelve un error 404.
        return jsonify({'error': 'Employee not found'}), 404





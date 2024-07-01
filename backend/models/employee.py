class Employee:
    def __init__(self, employee_id, name, email, phone):
        # Inicializa una instancia de Employee con el ID del empleado, nombre, correo electrónico y teléfono.
        self.employee_id = employee_id
        self.name = name
        self.email = email
        self.phone = phone

    def serialize(self):
        # Serializa los atributos del empleado a un diccionario para convertirlos fácilmente a JSON.
        return {
            'employee_id': self.employee_id,  # ID del empleado.
            'name': self.name,                # Nombre del empleado.
            'email': self.email,              # Correo electrónico del empleado.
            'phone': self.phone               # Teléfono del empleado.
        }




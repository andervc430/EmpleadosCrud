from flask import Flask
from flask_cors import CORS
from controllers.employee_controller import employee_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(employee_blueprint, url_prefix='/employee')

if __name__ == '__main__':
    app.run(port=5000)



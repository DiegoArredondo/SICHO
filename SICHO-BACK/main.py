from flask_orator import jsonify
from flask import Flask, render_template, send_from_directory, request
from app import db_config
from flask import Flask
from flask_cors import CORS
from flask_orator import Orator
import json
import time
import datetime

app = Flask(__name__, static_url_path= '')
app.config['ORATOR_DATABASES']= db_config.db_config
db= Orator(app)
# Cors (CROSS ORIGIN RESOURCE SHARING) 
CORS(app=app,supports_credentials=True)

""" IMPORT MODELS """
from app.models import Users as tablaUsers

""" PARA MONTAR SITIO WEB 

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/css/<path:path>')
def sendcss(path):
    return send_from_directory('css',path)
@app.route('/js/<path:path>')
def sendjs(path):
    return send_from_directory('js',path)
@app.route('/assets/<path:path>')
def sendassets(path):
    return send_from_directory('assets',path)
    
@app.route('/<path:path>')
def ruta(path):
    return send_from_directory('favicon',path)
 """


""" ENDPOINTS """

@app.route('/hola')
def hola():
    return "hola"


@app.route('/ruta', methods=['POST']) #GET requests will be blocked
def nombreDelMetodo(request):
    data = request.get_json(force = True)
    return data

""" AGREGAR UN USUARIO
EJEMPLO DE REQUEST:
{ 
    "id" : id
    "firstName" : firstName
    "lastName" : lastName
    "honorific" : honorific
    "department" : department
    "email" : email
    "telephone" : telephone
    "extension" : extension
    "schedule" : schedule
    "password" : password
    "passwordConfirm" : passwordConfirm
}"""
@app.route('/register',methods=['POST'])
def register():
    try:
        content = request.get_json(force=True)
        print("Received request for: register")
        print(content)
        userid=content['id']
        firstName=content['firstName']
        lastName=content['lastName']
        honorific=content['honorific']
        department=content['department']
        email=content['email']
        telephone=content['telephone']
        extension=content['extension']
        schedule=content['schedule']
        password1=content['password']
        password2=content['passwordConfirmation']

        if (password1 != password2):
            raise ValueError('Las contraseñas introducidas no coinciden')

        usuarioNuevo= tablaUsuarios()
        usuarioNuevo.id = userid
        usuarioNuevo.firstName = firstName
        usuarioNuevo.lastName = lastName
        usuarioNuevo.honorific = honorific
        usuarioNuevo.department = department
        usuarioNuevo.email = email
        usuarioNuevo.telephone = telephone
        usuarioNuevo.extension = extension
        usuarioNuevo.schedule = schedule
        usuarioNuevo.password = password1

        usuarioNuevo.save()

        return jsonify({"success":"Agregado con éxito"})
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route('/getAllUsers')
def dataUsers():
    return jsonify(tablaUsuarios.get().serialize())


""" AQUI VA LO DE LAS MATERIAS (Subject)

LOS PARAMETROS SON
id
subjectName
subjectId
start
durationMinutes
days

 """


if __name__ == '__main__':
    app.run(debug=True)

def getJson(url):
    jsonFile = open(url)
    print(url)
    answer = json.load(jsonFile)
    print(answer)
    return answer
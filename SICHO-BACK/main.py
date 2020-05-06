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
from app.models import Subjects as tablaSubjects
from app.models import Departments as tablaDepartments

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

@app.route('/registerDepartment',methods=['POST'])
def registerDepartment():
    try:
        content = request.get_json(force=True)
        print("\n\n\nReceived request for: register department")
        print(content)

        depid=content['id']
        depname=content['name']

        dep = tablaDepartments.where("id", depid).first()

        if(dep is None):
            nuevoDep = tablaDepartments()
            nuevoDep.id = depid
            nuevoDep.name = depname
            nuevoDep.save()
            return jsonify({"success":"Departamento agregado con éxito"})
        else:
            return jsonify({"error": "Ya existe un departamento con ese Id"})
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route('/register',methods=['POST'])
def register():
    try:
        content = request.get_json(force=True)
        print("\n\n\nReceived request for: register")
        print(content)

        userid=content['id']
        firstName=content['firstName']
        lastName=content['lastName']
        honorific=content['honorific']
        department=content['department']
        email=content['email']
        telephone=content['telephone']
        extension=content['extension']
        password=content['password']
        password2=content['passwordConfirmation']

        if(password != password2):
            raise ValueError("Las contraseñas proporcionadas no coinciden")

        nuevoUser= tablaUsers()
        nuevoUser.id = userid
        nuevoUser.firstName = firstName
        nuevoUser.lastName = lastName
        nuevoUser.honorific = honorific
        nuevoUser.department = department
        nuevoUser.email = email
        nuevoUser.telephone = telephone
        nuevoUser.extension = extension
        nuevoUser.password = password
        nuevoUser.contractType = ""
        nuevoUser.investigationLvl = ""
        nuevoUser.adviserHours = 0
        nuevoUser.classPrepHours = 0
        """ AQUI HAY QUE IR AL SISTEMA Y VER QUE CLASES LE FALTAN DE PROGRAMAR """
        nuevoUser.scheduleToProgram = "1,2,3,4,5"
        nuevoUser.save()

        return jsonify({"success":"Usuario gregado con éxito"})
    except Exception as e:
        return jsonify({"error":str(e)})

""" INICIAR SESION
    EJEMPLO DE REQUEST:
    {
        "id": "00000180890",
        "password": "pass"
    }
 """
@app.route('/login',methods=['POST'])
def login():
    try:
        content = request.get_json(force=True)
        print("\n\n\nReceived request for: login")
        print(content)
        userid=content['id']
        password=content['password']

        usuario = tablaUsers.where("id", userid).first()

        subjectsStr = usuario.scheduleToProgram.split(",")
        subjects = []

        for i in range(len(subjectsStr)):
            print("getting subject " + subjectsStr[i])
            #sub = tablaSubjects.where("classId","subjectsStr"[i]).first()
            subj = tablaSubjects.where("classId",3).first()
            if(subj is not None):
                subjects.append(subj.serialize())

        print(subjects)

        if(usuario is None ):
            return jsonify({"status":"error", "msg": "El usuario ingresado no existe en nuestra base de datos"})

        if(usuario.password != password):
            return jsonify({"status":"error", "msg": "El usuario y contraseña introducidos no son correctos"})

        usuario.scheduleToProgram = subjects

        return jsonify({"status":"logged", "user" : usuario.serialize()})
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route('/updateUserInfo',methods=['POST'])
def updateUser():
    try:
        content = request.get_json(force=True)
        print("\n\n\nReceived request for: update user info")
        print(content)
        userid=content['id']
        contractType=content['contractType']
        investigationLvl=content['investigationLvl']
        adviserHours=content['adviserHours']
        classPrepHours=content['classPrepHours']

        usuario = tablaUsers.where("id", userid).first()

        if(usuario is None ):
            return jsonify({"status":"error", "msg": "El usuario ingresado no existe en nuestra base de datos"})

        updateData ={'contractType': contractType,'investigationLvl': investigationLvl,'adviserHours': adviserHours,'classPrepHours': classPrepHours}

        tablaUsers.where('id',  userid).update(updateData)

        return jsonify({"status":"updated"})
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route('/updateSubjects',methods=['POST'])
def updateSubjects():
    try:
        content = request.get_json(True)
        print("\n\n\nReceived request for: update subject")
        print(content)

        subjects = content['subjects']

        if(len(subjects) == 0):
            raise ValueError("Debe de proporcionar por lo menos una materia")

        succesCases = []

        for subject in subjects:
            newSubject = tablaSubjects.where("classId", subject['classId']).first()
            newSubject.subjectName = subject['subjectName']
            newSubject.start = subject['start']
            newSubject.ends = subject['ends']
            newSubject.durationMinutes = subject['durationMinutes']
            newSubject.days = subject['days']
            newSubject.classroom = subject['classroom']
            newSubject.semester = subject['semester']

            newSubject.update({
                "subjectName": newSubject.subjectName,
                "start": newSubject.start,
                "ends": newSubject.ends,
                "durationMinutes": newSubject.durationMinutes,
                "days": newSubject.days,
                "classroom": newSubject.classroom,
                "semester": newSubject.semester
            })

        return jsonify({"status": "updated"})
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route('/addSubjects',methods=['POST'])
def addSubjects():
    try:
        content = request.get_json(True)
        print("\n\n\nReceived request for: addsubject")
        print(content)

        userid=content['userid']
        subjects = content['subjects']

        if(len(subjects) == 0):
            raise ValueError("Debe de proporcionar por lo menos una materia")

        user = tablaUsers.where('id',  userid).first()

        succesCases = []

        for subject in subjects:
            newSubject = tablaSubjects()
            newSubject.subjectName = subject['subjectName']
            newSubject.classId = subject['classId']
            newSubject.start = subject['start']
            newSubject.ends = subject['ends']
            newSubject.durationMinutes = subject['durationMinutes']
            newSubject.days = subject['days']
            newSubject.classroom = subject['classroom']
            newSubject.semester = subject['semester']
            newSubject.user = userid

            newSubject.save()

            user.scheduleToProgram = user.scheduleToProgram.replace("," + str(newSubject.classId), "")
            ##tablaUsers.where('id',  userid).update({'scheduleToProgram' : user.scheduleToProgram})

            succesCases.append("Agregada la materia '" + newSubject.subjectName + "' al usuario '" + user.firstName + "'. Clases faltantes: " )

        return jsonify({"success": succesCases})
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route('/getAllUsers')
def dataUsers():
    return jsonify(tablaUsers.get().serialize()) 
@app.route('/getAllDepartments')
def dataDepartments():
    return jsonify(tablaDepartments.get().serialize())
@app.route('/getAllSubjects')
def dataSubjects():
    return jsonify(tablaSubjects.get().serialize())
@app.route('/getAllSubjectsByUserId',methods=['POST'])
def dataSubjectsById():
    try:
        content = request.get_json(True)
        userid=content['userid']
        return jsonify(tablaSubjects.where('user',userid).get().serialize())
    except Exception as e:
        return jsonify({"error":str(e)})




if __name__ == '__main__':
    app.run(debug=True)

def getJson(url):
    jsonFile = open(url)
    print(url)
    answer = json.load(jsonFile)
    print(answer)
    return answer
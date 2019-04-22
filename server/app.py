from flask import Flask, jsonify, json, request, redirect, url_for
from flaskext.mysql import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from extractImage import extract
from extractMask import createMask
from classifier import Classifier
import os 
from werkzeug.utils import secure_filename


RAW_DATA_FOLDER = '/home/faqih/ITB/TA/Web/server/static/rawData'
MASK_DATA_FOLDER = '/home/faqih/ITB/TA/Web/server/static/maskData'
ALLOWED_EXTENSIONS = set(['dcm'])

app = Flask(__name__, static_url_path='/static', static_folder='static')

app.config['MYSQL_DATABASE_USER'] = 'TA'
app.config['MYSQL_DATABASE_PASSWORD'] = 'dagozilla'
app.config['MYSQL_DATABASE_DB'] = 'TA'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MAX_CONTENT_LENGTH'] = 3 * 1024 * 1024
mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    cur = mysql.get_db().cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created_at = datetime.utcnow()
	
    cur.execute("INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ('" + 
		str(first_name) + "', '" + 
		str(last_name) + "', '" + 
		str(email) + "', '" + 
		str(password) + "', '" + 
		str(created_at) + "')")
    mysql.get_db().commit()
	
    result = {
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'password' : password,
		'created_at' : created_at
	}

    return jsonify({'result' : result})
	

@app.route('/users/login', methods=['POST'])
def login():
    cur = mysql.get_db().cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    cur.execute("SELECT * FROM users where email = '" + str(email) + "'")
    rv = cur.fetchone()
	
    if bcrypt.check_password_hash(rv[4], password):
        access_token = create_access_token(identity = {'first_name': rv[1],'last_name': rv[2],'email': rv[3]})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result


def allowedFile(fileName):
    return '.' in fileName and fileName.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        result = jsonify({"error":"File not found"})
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without fileName
    if file.filename == '':
        result = jsonify({"error":"File doesnt have name"})
    elif (allowedFile(file.filename)==False):
        result = jsonify({"error":"File extension is not permitted"})
    elif file and allowedFile(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(RAW_DATA_FOLDER, fileName))
        fileName, patientID = extract(fileName, RAW_DATA_FOLDER)
        result = jsonify({"error":"","fileName":fileName, "patientID":patientID})
    return result

@app.route('/extract-mask', methods=['POST'])
def create_mask():
    data =  request.get_json()
    print(data)
    fileName, patientID = createMask(data['p0']['x'], data['p0']['y'], 
                            data['p1']['x'], data['p1']['y'], 
                            data['fileName'], data['patientID'], RAW_DATA_FOLDER)
    result = jsonify({"fileName":fileName, "patientID":patientID})
    return result

@app.route('/classify', methods=['POST'])
def classify():
    fileData = request.get_json()
    print(fileData)
    classifier = Classifier(fileData, RAW_DATA_FOLDER, MASK_DATA_FOLDER)
    prediction, patientID, fileName = classifier.classify()
    result = jsonify({'prediction': prediction, 'patientID': patientID, 'fileName': fileName})
    print(prediction)
    return result
	
if __name__ == '__main__':
    app.run(debug=True)
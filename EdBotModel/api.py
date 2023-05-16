from flask import Flask
from flask_restful import Resource, Api, reqparse
from model import run_model_api, run_model
from flask import request
import json

from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
api = Api(app)

# JWT configuration
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)

# Request parser for Users resource
parser = reqparse.RequestParser()
parser.add_argument('question', type=str)
parser.add_argument('chat_history', type=str)

class Users(Resource):
    @jwt_required  # JWT authentication required for this method
    def get(self):
        data = "4" # convert dataframe to dictionary
        answer = run_model()
        return {'data': answer}, 200  # return data and 200 OK code
    
class Locations(Resource):
    # methods go here
    pass
    
api.add_resource(Users, '/model')  # '/model' is the entry point for Users
api.add_resource(Locations, '/locations') 

@app.route('/runModel')
@jwt_required  # JWT authentication required for this route
def runModel():
    # get the current user's identity from the JWT token
    current_user = get_jwt_identity()
    
    # here we want to get the value of user (i.e. ?user=some-value)
    question = request.args.get('question')
    chat_history = request.args.get('chat_history')
    answer = run_model_api(question, chat_history)
    return answer

@app.route('/runModelJson', methods=['POST'])
@jwt_required  # JWT authentication required for this route
def runModelJson():
    # get the current user's identity from the JWT token
    current_user = get_jwt_identity()
    
    data = json.loads(request.data)
    # print(data)
    que = data["question"]
    chat= data["chat_history"]
    answer = run_model_api(que, chat)
    return answer

@app.route('/runModelJsonTest', methods=['POST'])
@jwt_required  # JWT authentication required for this route
def runModelJsonTest():
    # get the current user's identity from the JWT token
    current_user = get_jwt_identity()
    
    data = json.loads(request.data)
    # print(data)
    que = data["question"]
    chat= data["chat_history"]
    ans = "Answer sample"
    return answer

# JWT authentication routes
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username or not password:
        return {'error': 'Username or password missing'}, 400
    # Check the username and password (e.g. from a database)
    if username == 'test' and password == 'password':
        access_token = create_access_token(identity=username)
        return {'access_token': access_token}, 200
    else:
        return {'error': 'Invalid credentials'}, 401

@app.route('/protected')
@jwt_required  # JWT authentication required for this route
def protected():
    # get the current user's identity from the JWT token
    current_user = get_jwt_identity()
    return {'message': f'Hello, {current_user}!'}, 200

if __name__ == '__main__':
    app.run()

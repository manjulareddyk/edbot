from flask import Flask
from flask_restful import Resource, Api, reqparse
from model import run_model_api
from flask import request
import json

import ast
app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

class Users(Resource):
    def get(self):
        data = "4" # convert dataframe to dictionary
        answer = run_model()
        return {'data': answer}, 200  # return data and 200 OK code
    
class Locations(Resource):
    # methods go here
    pass
    
api.add_resource(Users, '/model')  # '/users' is our entry point for Users
api.add_resource(Locations, '/locations') 

@app.route('/runModel')
def runModel():
    # here we want to get the value of user (i.e. ?user=some-value)
    question = request.args.get('question')
    chat_history = request.args.get('chat_history')
    answer = run_model_api(question, chat_history)
    return answer


@app.route('/runModelJson', methods=['POST'])
def runModelJson():
    data = json.loads(request.data)
    # print(data)
    que = data["question"]
    chat= data["chat_history"]
    answer = run_model_api(que, chat)
    return answer



if __name__ == '__main__':
    app.run()  # run our Flask app
from flask import Flask
from flask_restful import Resource, Api, reqparse
from model import run_model
import ast
app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

class Users(Resource):
    def get(self):
        data = "4" # convert dataframe to dictionary
        run_model()
        return {'data': data}, 200  # return data and 200 OK code
    
class Locations(Resource):
    # methods go here
    pass
    
api.add_resource(Users, '/model')  # '/users' is our entry point for Users
api.add_resource(Locations, '/locations') 

if __name__ == '__main__':
    app.run()  # run our Flask app
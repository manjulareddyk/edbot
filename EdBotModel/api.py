from flask import Flask
from flask_restful import Resource, Api, reqparse
from model import run_model_api
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity


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


#install the pip install Flask-JWT
app.config['SECRET_KEY'] = 'super-secret'

"""
Here, we've added the @jwt_required decorator to the runModel() function,
which checks for a valid JWT token in the request headers before executing the function.
If no valid token is found, a 401 Unauthorized error will be returned.
"""
@app.route('/runModel')
@jwt_required
def runModel():
    # here we want to get the value of user (i.e. ?user=some-value)
    question = request.args.get('question')
    answer = run_model_api(question)
    user_id = get_jwt_identity()
    return answer


if __name__ == '__main__':
    app.run()  # run our Flask app
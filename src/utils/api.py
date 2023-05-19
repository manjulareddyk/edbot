from flask import Flask, request
from flask_restful import Api

# from ..models.model import run_model
from flask_cors import CORS

import sys
import os

# Get the current directory (assuming this code is in api.py)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Get the root directory by traversing up two levels
root_dir = os.path.dirname(os.path.dirname(current_dir))

# Add the root directory to the Python path
sys.path.append(root_dir)

from src.models import model

app = Flask(__name__)
CORS(app)
api = Api(app)


@app.route("/runModel")
def runModel():
    question = request.args.get("question")
    answer = model.run_model(question)
    # answer="Test Answer"
    return answer


if __name__ == "__main__":
    app.run()  # run our Flask app

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

LM_URL = "http://localhost:1234/v1/chat/completions"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    response = requests.post(LM_URL, json=data)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(port=5000)
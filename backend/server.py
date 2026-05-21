from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GROQ_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route("/chat", methods=["POST"])
def chat():
    if not GROQ_KEY:
        return jsonify({"error": {"message": "GROQ_API_KEY not set in .env"}}), 500
    data = request.json
    response = requests.post(
        GROQ_URL,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_KEY}"
        },
        json=data
    )
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
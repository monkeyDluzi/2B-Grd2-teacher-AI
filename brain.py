import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai

# 1. Load the secret key from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# 2. Grab the key safely from environment variables
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    try:
        # Use the Interactions API with gemini-3.6-flash
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=user_message,
            system_instruction="You are 2B, a friendly, encouraging AI assistant for Grade 2 students. Keep responses simple, educational, and fun!"
        )
        
        return jsonify({"reply": interaction.output_text})

    except Exception as e:
        print("\n" + "="*50)
        print("GEMINI ERROR DETAILS:", e)
        print("="*50 + "\n")
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(port=5000, debug=True)
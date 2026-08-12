import os
from flask import Flask, request, jsonify
from flask_cors import CORS

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = Flask(__name__)

# Allow requests from local development and GitHub Pages
CORS(app, resources={r"/api/*": {"origins": [
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "https://monkeydluzi.github.io"
]}})

client = None
try:
    from google import genai
    from google.genai import types

    # Now checks GEMINI_API_KEY (matching your Render environment variable)
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    
    if api_key:
        client = genai.Client(api_key=api_key)
        print("GenAI client initialized successfully.")
    else:
        print("No Gemini API key found. Running in local test mode.")
except Exception as e:
    print("GenAI client unavailable; running in local test mode.", e)


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json or {}
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    if client is None:
        return jsonify({
            "reply": (
                f"2B says: I got your message '{user_message}'. "
                "This is a local test response while the AI backend is not configured yet."
            )
        })

    try:
        # Use the Interactions API with gemini-2.5-flash
        interaction = client.interactions.create(
            model="gemini-2.5-flash",
            input=user_message,
            system_instruction=(
                "You are 2B, a friendly, encouraging AI teacher for any Grade. "
                "Keep responses simple, educational, and fun!"
            )
        )
        
        # Access response text from interaction.output_text
        return jsonify({"reply": interaction.output_text})

    except Exception as e:
        print("\n" + "="*50)
        print("GEMINI ERROR DETAILS:", e)
        print("="*50 + "\n")
        return jsonify({"error": str(e)}), 500

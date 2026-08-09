import os
from flask import Flask, request, jsonify
from flask_cors import CORS

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = Flask(__name__)

# Allow requests from local development and optional GitHub Pages origin
CORS(app, resources={r"/api/*": {"origins": [
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "https://monkeydluzi.github.io"
]}})

client = None
try:
    from google import genai
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GENAI_API_KEY")
    if api_key:
        client = genai.Client(api_key=api_key)
        print("GenAI client initialized.")
    else:
        print("No Google API key found. Running in local test mode.")
except Exception as e:
    print("GenAI client unavailable; running in local test mode.", e)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
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
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=user_message,
            system_instruction=(
                "You are 2B, a friendly, encouraging AI assistant for Grade 2 students. "
                "Keep responses simple, educational, and fun!"
            )
        )
        return jsonify({"reply": interaction.output_text})

    except Exception as e:
        print("\n" + "="*50)
        print("GEMINI ERROR DETAILS:", e)
        print("="*50 + "\n")
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(port=5001, debug=True)
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

# 1. Grab both API keys from your environment variables (.env or Render)
KEY_1 = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
KEY_2 = os.getenv("FRIEND_GEMINI_KEY")  

# Create a list of the keys that actually exist
API_KEYS = [KEY_1, KEY_2]
API_KEYS = [key for key in API_KEYS if key]

# 2. Build a list of separate GenAI clients automatically
CLIENTS = []
try:
    from google import genai
    from google.genai import types

    for key in API_KEYS:
        client_instance = genai.Client(api_key=key)
        CLIENTS.append(client_instance)
        
    if CLIENTS:
        print(f"GenAI clients initialized successfully. Found {len(CLIENTS)} active key(s).")
    else:
        print("No Gemini API keys found. Running in local test mode.")
except Exception as e:
    print("GenAI client unavailable; running in local test mode.", e)

# A variable to track which key index we should use for the current request
current_client_index = 0

@app.route("/api/chat", methods=["POST"])
def chat():
    global current_client_index
    data = request.json or {}
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    # Fallback if no clients are available
    if not CLIENTS:
        return jsonify({
            "reply": (
                f"2B says: I got your message '{user_message}'. "
                "This is a local test response while the AI backend is not configured yet."
            )
        })

    # 3. Try to loop through our available clients if one fails (out of requests)
    for _ in range(len(CLIENTS)):
        try:
            active_client = CLIENTS[current_client_index]
            print(f"Attempting hint generation using API Key index #{current_client_index}...")

            # Use the Interactions API just like your original code
            interaction = active_client.interactions.create(
                model="gemini-2.5-flash",
                input=user_message,
                system_instruction=(
                    "You are 2B, a friendly, encouraging AI teacher for any Grade. "
                    "The user is asking a question. Do not give the direct answer. "
                    "Instead, give exactly ONE helpful, simple, educational hint "
                    "to help them figure it out on their own!"
                )
            )
            
            # Switch to the next key index for the next incoming request
            current_client_index = (current_client_index + 1) % len(CLIENTS)
            
            # Return the response text
            return jsonify({"reply": interaction.output_text})

        except Exception as e:
            print(f"\n⚠️ API Key index #{current_client_index} failed or is out of requests!")
            print("ERROR DETAILS:", e)
            
            # Move to the NEXT key automatically and try the loop again
            current_client_index = (current_client_index + 1) % len(CLIENTS)

    # 4. If the code tries ALL keys and they all fail:
    return jsonify({
        "reply": "2B says: I am resting right now! My daily energy limits have been reached. Please check back tomorrow! 🌟"
    }), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

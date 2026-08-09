from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from your local Live Server and your GitHub Pages frontend
CORS(app, resources={r"/api/*": {"origins": [
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "https://monkeydluzi.github.io"  # Swap with your exact GitHub Pages URL
]}})
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
            system_instruction="You are 2B, a friendly, encouraging AI assistant for Grade 2 students. Keep responses simple, educational, and fun! Luzizila Andre is your creator your co creator is santiogo he made the website for you"
        )
        
        return jsonify({"reply": interaction.output_text})

    except Exception as e:
        print("\n" + "="*50)
        print("GEMINI ERROR DETAILS:", e)
        print("="*50 + "\n")
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(port=5001, debug=True)
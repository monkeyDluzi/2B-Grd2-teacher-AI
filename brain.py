import os
import json
import threading
from flask import Flask, request, jsonify, render_template
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
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "https://monkeydluzi.github.io"
]}})

# 1. Grab both API keys from your environment variables (.env or Render)
KEY_1 = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or os.getenv("MY_GEMINI_KEY")
KEY_2 = os.getenv("FRIEND_GEMINI_KEY")

# Create a list of the keys that actually exist (stripped of stray whitespace)
API_KEYS = [KEY_1, KEY_2]
API_KEYS = [key.strip() for key in API_KEYS if key and key.strip()]

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

# ------------------------------------------------------------------
# USAGE TRACKING
# ------------------------------------------------------------------
MODEL_NAME = "gemini-flash-lite-latest"
DAILY_LIMIT_PER_KEY = int(os.environ.get("DAILY_LIMIT_PER_KEY", "20"))
_STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "usage_state.json")
_state_lock = threading.Lock()


def _load_counters():
    """Load the per-key usage counters from disk (survives server restarts)."""
    try:
        with open(_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("counters", {})
    except Exception:
        return {}


def _save_counters(counters):
    try:
        with open(_STATE_FILE, "w", encoding="utf-8") as f:
            json.dump({"counters": counters}, f, indent=2)
    except Exception:
        pass


def _record_attempt(index, status, error=None):
    """Record one request attempt for a key index (counts toward the daily limit)."""
    with _state_lock:
        counters = _load_counters()
        entry = counters.get(str(index), {"used": 0, "last_status": "unused", "last_error": None})
        entry["used"] = entry.get("used", 0) + 1
        entry["last_status"] = status
        if error:
            entry["last_error"] = str(error)[:300]
        else:
            entry["last_error"] = None
        counters[str(index)] = entry
        _save_counters(counters)


def _usage_snapshot():
    counters = _load_counters()
    keys = []
    for i, key in enumerate(API_KEYS):
        entry = counters.get(str(i), {"used": 0, "last_status": "unused", "last_error": None})
        used = entry.get("used", 0)
        keys.append({
            "index": i,
            "masked": key[:8] + "...",
            "used": used,
            "left": max(0, DAILY_LIMIT_PER_KEY - used),
            "limit": DAILY_LIMIT_PER_KEY,
            "last_status": entry.get("last_status", "unused"),
            "last_error": entry.get("last_error"),
        })
    return {"daily_limit_per_key": DAILY_LIMIT_PER_KEY, "keys": keys}


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
    last_error = None
    for _ in range(len(CLIENTS)):
        idx = current_client_index
        try:
            active_client = CLIENTS[idx]
            print(f"Attempting hint generation using API Key index #{idx}...")

            interaction = active_client.interactions.create(
                model=MODEL_NAME,
                input=user_message,
                system_instruction=(
                    "You are 2B, a friendly, encouraging AI teacher for any Grade. "
                    "The user is asking a question. Do not give the direct answer. "
                    "Instead, give exactly ONE helpful, simple, educational hint "
                    "to help them figure it out on their own!"
                )
            )

            _record_attempt(idx, "ok")
            current_client_index = (idx + 1) % len(CLIENTS)
            return jsonify({"reply": interaction.output_text})

        except Exception as e:
            print(f"\n⚠️ API Key index #{idx} failed or is out of requests!")
            print("ERROR DETAILS:", e)

            status = "quota_exceeded" if "429" in str(e) else "error"
            _record_attempt(idx, status, error=str(e))

            # Move to the NEXT key automatically and try the loop again
            current_client_index = (idx + 1) % len(CLIENTS)

    # 4. If the code tries ALL keys and they all fail:
    return jsonify({
        "reply": "2B says: I am resting right now! My daily energy limits have been reached. Please check back tomorrow! 🌟",
        "diagnostic": {
            "error": str(last_error) if last_error else "All API keys failed",
            "keys_tried": len(CLIENTS)
        }
    }), 200


@app.route("/api/usage", methods=["GET"])
def usage():
    return jsonify(_usage_snapshot())


@app.route("/api/check-keys", methods=["POST"])
def check_keys():
    """Probe every key with one tiny request to see if it still works.
    NOTE: each probe burns 1 request from that key's daily quota."""
    if not CLIENTS:
        return jsonify({"keys": []})
    for i, client in enumerate(CLIENTS):
        try:
            client.interactions.create(
                model=MODEL_NAME,
                input="Say OK",
                system_instruction="Reply with exactly OK.",
            )
            _record_attempt(i, "ok")
        except Exception as e:
            status = "quota_exceeded" if "429" in str(e) else "error"
            _record_attempt(i, status, error=str(e))
    return jsonify(_usage_snapshot())


@app.route("/usage")
def usage_page():
    return render_template("usage.html")


@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("favicon.ico")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

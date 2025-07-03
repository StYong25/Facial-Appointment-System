from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allow React Native to call this API

GEMINI_API_KEY = "AIzaSyDqU2qAjtSrln6XlycXr6ftrjQAm-9n2vQ"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

@app.route("/ask", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    question = data.get("question", "").strip()

    print(f"📥 Received question: {question}")

    if not question:
        return jsonify({"error": "No question provided."}), 400

    payload = {
        "contents": [{"parts": [{"text": question}]}]
    }

    try:
        response = requests.post(GEMINI_URL, json=payload)
        result = response.json()

        print(f"📡 Gemini API Raw Response: {result}")

        # Check for API errors or invalid responses
        if "error" in result:
            error_message = result["error"].get("message", "Unknown API Error")
            return jsonify({"response": f"API Error: {error_message}"}), 500

        candidates = result.get("candidates", [])
        if not candidates:
            return jsonify({"response": "No response from AI model."}), 200

        content = candidates[0].get("content", {})
        parts = content.get("parts", [])
        if not parts:
            return jsonify({"response": "AI model did not return any content."}), 200

        answer = parts[0].get("text", "No response.")

        return jsonify({"response": answer})

    except Exception as e:
        print(f"❌ Error contacting Gemini API: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

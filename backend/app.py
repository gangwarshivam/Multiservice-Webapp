from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "ok", "message": "Flask backend alive"})

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json() or request.form.to_dict() or {}
    # Basic validation
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({"error": "name, email and message are required"}), 400

    # Here you can process/save the data (DB, file, send mail...). For demo, we'll echo back
    processed = {
        "received_at": datetime.utcnow().isoformat() + "Z",
        "name": name,
        "email": email,
        "message": message,
        "note": "Processed by Flask backend"
    }

    # Return a JSON response
    return jsonify(processed), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

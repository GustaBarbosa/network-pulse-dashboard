import subprocess
import re
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# strict regex
IP_VALIDATION_REGEX = r"^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"

def ping_ip(ip):
    try:
        command = ["ping", "-c", "1", "-W", "1", ip]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        if result.returncode == 0:
            time_match = re.search(r"time=(\d+\.?\d*)", result.stdout)
            latency = f"{time_match.group(1)}ms" if time_match else "0ms"

            return {"ip": ip, "status": "online", "latency": latency}
        
        else:
            return {"ip": ip, "status": "offline", "latency": "N/A"}
    except Exception as e:
        return {"ip": ip, "status": "error", "latency": "N/A", "error": str(e)}

@app.route('/api/scan', methods=['GET'])
def network_scan():
    user_ip = request.args.get('ip')
    
    if not user_ip:
        return jsonify({"error": "IP address is required"}), 400

    if not re.match(IP_VALIDATION_REGEX, user_ip):
        return jsonify({"error": "Not a valid IP address format. Must be a real IP between 0 and 255"}), 400

    scan_result = ping_ip(user_ip)
    return jsonify([scan_result])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
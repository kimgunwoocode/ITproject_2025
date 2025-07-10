from firebase_admin import auth as firebase_auth
from flask import request, jsonify
from functools import wraps

def verify_firebase_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        id_token = request.headers.get('Authorization')
        if not id_token or not id_token.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token"}), 401
        try:
            decoded_token = firebase_auth.verify_id_token(id_token[7:])
            request.uid = decoded_token['uid']
        except Exception as e:
            return jsonify({"error": "Token invalid", "details": str(e)}), 403
        return f(*args, **kwargs)
    return decorated

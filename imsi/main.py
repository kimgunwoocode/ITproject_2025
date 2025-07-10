from flask import Flask, request, jsonify
from auth import verify_firebase_token
from user import get_user, init_user_profile
from schedule import add_schedule, get_user_schedules
from ai_recommend import get_ai_recommendation
from report import generate_report
from external_api import get_weather

app = Flask(__name__)

@app.route("/init-profile", methods=["POST"])
@verify_firebase_token
def init_profile():
    body = request.json
    uid = request.uid
    init_user_profile(uid, body["email"], body["display_name"])
    return jsonify({"status": "initialized"})

@app.route("/me", methods=["GET"])
@verify_firebase_token
def me():
    return jsonify(get_user(request.uid))

@app.route("/schedule", methods=["POST"])
@verify_firebase_token
def create_schedule():
    body = request.json
    sid = add_schedule(request.uid, body)
    return jsonify({"schedule_id": sid})

@app.route("/schedule", methods=["GET"])
@verify_firebase_token
def read_schedules():
    return jsonify(get_user_schedules(request.uid))

@app.route("/recommend", methods=["POST"])
@verify_firebase_token
def recommend():
    preferences = request.json
    result = get_ai_recommendation(preferences)
    return jsonify(result)

@app.route("/report", methods=["GET"])
@verify_firebase_token
def report():
    return jsonify(generate_report(request.uid))

@app.route("/weather", methods=["GET"])
def weather():
    location = request.args.get("location", "Seoul")
    return jsonify(get_weather(location))

if __name__ == "__main__":
    app.run(debug=True)

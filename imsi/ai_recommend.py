import requests

def get_ai_recommendation(user_preferences):
    url = ""
    response = requests.post(url, json=user_preferences)
    return response.json()
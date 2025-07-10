import requests

def get_weather(location):
    url = ""
    params = {"key": "YOUR_API_KEY", "q": location}
    res = requests.get(url, params=params)
    return res.json()
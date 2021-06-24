import requests

BASE = "http://127.0.0.1:5000/"
response = requests.get(
    BASE + "it is good in shape but bad in features and amazing and excellent in driving")

print(response.json())

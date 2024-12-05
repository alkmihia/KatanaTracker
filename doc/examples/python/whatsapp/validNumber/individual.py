import requests
import os

req = "http://localhost:3000/check-number"
arq = open(os.path.dirname(os.path.realpath(__file__)) + "/numbers.txt")

for x in arq.readlines():
    if x is not None:
        r = requests.post(req, json={
            "number": x
        })

        data = r.json()['data']
        print(data['number'], data['isVerify'])
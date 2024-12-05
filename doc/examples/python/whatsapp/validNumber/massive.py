import requests
import os

req = "http://localhost:3000/check-all-numbers"
arq = open(os.path.dirname(os.path.realpath(__file__)) + "/numbers.txt")

numbers = set()
for x in arq.readlines():
    if x is not None:
        numbers.add(x)

response = requests.post(req, json={
    "numbers": list(numbers)
})

valid = response.json()['data']
for x in valid['numbers']:
    print(x)
<div align='center'>
   <h1>KatanaTracker</h1>
   <img src="https://raw.githubusercontent.com/alkmihia/resources/refs/heads/main/images/logos/katana/1024x1024.png", width="300"/>
   <h3>Software Open Source for OSINT and tracking</h3>
</div>
<hr>
<div align="left"> 
Katanatracker is an open-source software designed to assist in collecting and analyzing information for OSINT (Open Source Intelligence) investigations and tracking. Its primary goal is to provide advanced tools that enable users to efficiently and securely identify, monitor, and analyze publicly available data.
</div>

<div align="left">
<h2> Functions </h2>
<ul> 
<li>Verify Whatsapp numbers ✅</li>
</ul>
</div>

### Dependencies
``
nodejs (mandatory), git (optional)
``

## Instalation

#### Linux (All distros)
```
$ git clone https://github.com/alkmihia/KatanaTracker
$ cd KatanaTracker
$ npm install
```

#### Windows
If you have git on your operating system, then continue with the same procedure as Linux does.

## START

#### Linux (All distros)
```
$ ./start
```

#### Windows
```
$ npm start
```



<div align="center">
<h2> DOCUMENTATION</h2>
</div>

All our code is in <strong>doc/examples</strong>

# Functions

#### Verify Number if exist in Whatsapp

With the API, you can check if a user's WhatsApp number exists. It's a great tool for those who analyze multiple phone numbers.
### Examples:
##### Individual
```python
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
```

##### Massive
```python
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
```
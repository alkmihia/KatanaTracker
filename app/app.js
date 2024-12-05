const express = require('express');
const Wpp = require('../src/whats/wpp');
const Msg = require('./utils/msg');

const app = express();
app.use(express.json());

const wppH = new Wpp();

function handle(res, params) {
  const { status, data } = params;
  return res.status(status).json(data);
}

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return handle(res, Msg.bad_request(undefined, "Invalid Json Format",{
      return: false,
      data: {}
    }))
  }
  next();
});

app.get("/", async (req, res) => {
  try {
    const statusWPP = await wppH.isReady();
    handle(res, Msg.success(undefined, "Clients", {return: true, data: { wppClient: statusWPP } }));
  } catch (error) {
    console.error("Error:", error.message);
    return handle(res, Msg.internalError());
  }
});

app.post('/check-all-numbers', async (req, res) => {
  let {numbers} = req.body
  let formatNumber = []

  if(!Array.isArray(numbers)) {
    return handle(res, Msg.bad_request(undefined, "Invalid list numbers"))
  }

  for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    
    if(!isNaN(parseInt(number)) && isFinite(number)) {
      number = number.toString();

      try {
        number = number.replace(/\D/g, '');
        formatNumber.push(number)
      } catch {
        continue
      }
    }
  }

  if (await wppH.isReady()) {
    let final = await wppH.checkAllNumbersIfExists(formatNumber)
    return handle(res, Msg.success(undefined, "Numbers Valid", {
      data: {
        numbers: final
      }
    }))
  } else {
    return handle(res, Msg.bad_request(undefined, "Service not ready")); 
  }
});

app.post('/check-number', async (req, res) => {
  let { number } = req.body;
  let isVerify = false;

  if (!number) {
    return handle(res, Msg.bad_request(undefined, "Invalid Number"));
  }

  if (!isNaN(parseInt(number)) && isFinite(number)) {
    number = number.toString();
  } else {
    return handle(res, Msg.bad_request(undefined, "Value not valid"));
  }

  try {
    number = number.replace(/\D/g, '');
    if (number.length <= 8) {
      return handle(res, Msg.bad_request(undefined, "Number is too short"));
    }

    if (await wppH.isReady()) {
      isVerify = await wppH.checkIfNumberExists(number);
      return handle(res, Msg.success(undefined, "Success", {data: {number: number, isVerify: isVerify}}));
    } else {
      return handle(res, Msg.bad_request(undefined, "Service not ready"));
    }
  } catch (error) {
    console.error("Error during number verification:", error);
    return handle(res, Msg.internal_error(undefined, "Internal Error"));
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Started - ${PORT}`);
});

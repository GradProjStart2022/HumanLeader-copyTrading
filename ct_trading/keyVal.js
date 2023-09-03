const request = require("request");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const accessKey = "6ycvzM61YLXZinx6ERLIZ2xca2ZBoNgMBEgQK4oB";
const secretKey = "UEIfmOTB8fybdg6JKSMTYote529CZspDRy3MlEA7";

const baseUrl = "https://api.upbit.com";
const endpoint = "/v1/accounts";

const payload = {
  access_key: accessKey,
  nonce: Date.now(),
};

const token = jwt.sign(payload, secretKey);
const signature = crypto
  .createHmac("sha512", secretKey)
  .update(token)
  .digest("hex");

const options = {
  url: baseUrl + endpoint,
  headers: {
    Authorization: `Bearer ${token}`,
    "CB-ACCESS-SIGN": signature,
  },
};

request.get(options, (error, response, body) => {
  if (error) {
    console.error("API Error:", error);
  } else {
    console.log("API Response:", body);
  }
});

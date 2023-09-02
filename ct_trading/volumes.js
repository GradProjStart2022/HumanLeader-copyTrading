const { v4: uuidv4 } = require("uuid");
const request = require("request");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

const access_Key = "6ycvzM61YLXZinx6ERLIZ2xca2ZBoNgMBEgQK4oB";
const secret_Key = "UEIfmOTB8fybdg6JKSMTYote529CZspDRy3MlEA7";
const server_url = "https://api.upbit.com";

const state = "done";
const uuids = [];

const non_array_body = {
  state: state,
};
const array_body = {
  uuids: uuids,
};
const body = {
  ...non_array_body,
  ...array_body,
};

const uuid_query = uuids.map((uuid) => `uuids[]=${uuid}`).join("&");
const query = queryEncode(non_array_body) + "&" + uuid_query;

const hash = crypto.createHash("sha512");
const queryHash = hash.update(query, "utf-8").digest("hex");

const payload = {
  access_key: access_Key,
  nonce: uuidv4(),
  query_hash: queryHash,
  query_hash_alg: "SHA512",
};

const token = sign(payload, secret_Key);

const options = {
  method: "GET",
  url: server_url + "/v1/orders?" + query,
  headers: { Authorization: `Bearer ${token}` },
  json: body,
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  console.log(Object.keys(body).length);
  let totalSum = 0;

  body.forEach((element) => {
    const volume = parseFloat(element.volume);
    const price = parseFloat(element.price);
    const product = volume * price;
    totalSum += product;
    console.log(element);
  });
});

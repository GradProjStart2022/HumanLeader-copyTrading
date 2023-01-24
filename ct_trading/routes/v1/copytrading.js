import express from "express";
import getFollower from "./getfollowers";
import request from "request";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

const router = express.Router();

router.post("/", async (req, res) => {
  const access_key = "r79ie7niEKx95TxTXsBxwdFt1wb9lYHxP1ZbY8fw";
  const secret_key = "fbuIcqfMRLAPd6O1jTphZUs6YVnKduxFewt4K45x";
  const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

  const body = {
    market: req.market,
    side: req.side,
    volume: req.volume,
    price: req.price,
    ord_type: req.ord_type,
  };

  const query = queryEncode(body);

  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = sign(payload, secret_key);

  const options = {
    method: "POST",
    url: server_url + "/v1/orders",
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
  });

  console.log(req.body);
  res.json("카피트레이딩 서버에 전송완료");
});

module.exports = router;

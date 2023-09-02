import express from "express";
import request from "request";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import getFollowers from "./getfollowers";

const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

const router = express.Router();

const followers = getFollowers();
// 업비트 호가 단위 기준
const ranges = [
  [2000000, 1000],
  [1000000, 500],
  [500000, 100],
  [100000, 50],
  [10000, 10],
  [1000, 5],
  [1, 1],
  [0.1, 0.1],
  [0.01, 0.01],
  [0.001, 0.001],
  [0.0001, 0.0001],
];
// 호가 수정용 올림 함수
function ceilValue(value) {
  for (const [rangeValue, step] of ranges) {
    if (value >= rangeValue) {
      return Math.ceil(value / step) * step;
    }
  }
  return value;
}

// 호가 수정용 내림 함수
function floorValue(value) {
  for (const [rangeValue, step] of ranges) {
    if (value >= rangeValue) {
      return Math.floor(value / step - 1) * step;
    }
  }
}

// 거래 발생 수신
router.post("/", async (req, res) => {
  const followers1 = await followers;
  // 수신받은 leader의 팔로워들만 필터링
  const targetFollowers = followers1.filter(
    (obj) => obj["LEADER_SEQ"] === req.body[0].LEADER_SEQ
  );
  // 타겟 팔로워들에 대해 거래 요청 송신
  targetFollowers.forEach((follower) => {
    const access_key = follower.ACCESS_KEY;
    const secret_key = follower.SECRET_KEY;
    const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

    // 구독자들의 거래 유형 별 요청거래량 계산을 위한 변수
    let calculatedVol;
    let calculatedPrice;

    // 구독자 별 거래량 계산
    if (follower.COPY_TRADE_TYPE === "CT01") {
      calculatedVol = follower.FIXED_AMOUNT / req.body[0].price;
      console.log(`ct01주문수량 ${calculatedVol}`);
    } else if (follower.COPY_TRADE_TYPE === "CT02") {
      calculatedVol = (req.body[0].volume * follower.FIXED_RATIO) / 100;
      console.log(`ct02주문수량 ${calculatedVol}`);
    }
    //매도 sleepage
    if (req.body[0].side === "bid") {
      calculatedPrice = floorValue(req.body[0].price * 1.005);
    } else if (req.body[0].side === "ask") {
      calculatedPrice = ceilValue(req.body[0].price * 0.995);
    }

    // 거래요청 parameter
    const body = {
      market: req.body[0].market,
      side: req.body[0].side,
      volume: calculatedVol.toString(),
      price: calculatedPrice.toString(),
      ord_type: req.body[0].ord_type,
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
  });
  res.json("업비트 서버에 전송완료");
});

module.exports = router;

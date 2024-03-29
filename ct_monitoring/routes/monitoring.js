import request from "request";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import _ from "lodash";

require("dotenv").config();
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

let bodyT = {};

// 테스트용 시간
// const currentDate = new Date().toISOString().slice(0, 19);

// 시간 보정
const currentUTCTime = new Date();
const currentDate = new Date(currentUTCTime.getTime() + 9 * 60 * 60 * 1000);

function monitoring(leader) {
  const access_key = leader["ACCESS_KEY"]; // 리더 ACCESS KEY
  const secret_key = leader["SECRET_KEY"]; // 리더 SECRET KEY
  const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

  const state = "done";

  const uuids = [
    //...
  ];
  const non_array_body = {
    state: state,
    page: 1,
    limit: 1,
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
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = sign(payload, secret_key);

  const options = {
    method: "GET",
    url: server_url + "/v1/orders?" + query,
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    if (
      JSON.stringify(bodyT) !== JSON.stringify(body) &&
      body[0].created_at.slice(0, 19) > currentDate.toISOString().slice(0, 19)
    ) {
      console.log(body[0])
      // trading 서버에 거래 발생 POST
      bodyT = body;

      let body1 = _.cloneDeep(body);
      body1[0].LEADER_SEQ = leader["LEADER_SEQ"];
      // monitoring한 거래기록 확인
      // console.log(body1);
      const options = {
        uri: "http://localhost:4020/v1/copytrading/",
        method: "POST",

        body: body1,
        json: body1,
      };
      console.log("카피트레이딩 서버에 전송완료");

      // 카필트레이딩 서버에 전송
      request.post(options, function (error, response, body) {
      });

      // main 서버에 거래 발생 POST 부분
      let tradeType;
      let avg_buy_price;
      // 매수일 때
      if (body1[0].side === "bid") {
        tradeType = "TT01";
        // 평단가 불러오기
        const payload = {
          access_key: access_key,
          nonce: uuidv4(),
        };

        const token = sign(payload, secret_key);

        const options = {
          method: "GET",
          url: server_url + "/v1/accounts",
          headers: { Authorization: `Bearer ${token}` },
        };

        request(options, (error, response, body) => {
          if (error) throw new Error(error);
          let json1 = JSON.parse(response.body);
          avg_buy_price = json1.filter(
            (item) => item.currency === body1[0].market.match(/-(.*)/)[1]
          )[0].avg_buy_price;
        });
        // 매도일 떄
      } else if (body1[0].side === "ask") {
        tradeType = "TT02";
      }
      const date = body1[0].created_at.slice(0, 19);

      const options2 = {
        url: "http://localhost:3000/trade/newtrade",
        method: "POST",
        json: {
          LEADER_SEQ: leader["LEADER_SEQ"],
          HISTORY_NUM: body1[0].uuid,
          TRADE_TYPE: tradeType,
          TRADE_SYMBOL: "test_sym",
          TRADE_MARKET: body1[0].market,
          TRADE_PRICE: body1[0].price,
          TRADE_VOLUME: body1[0].volume,
          REG_DT: date,
          AVG_BUY_PRICE: avg_buy_price,
        },
      };
      // main 서버 전송
      request.post(options2, function (error, response, body) {
        //console.log(response.body);
        console.log("메인 서버에 전송완료");
      });
    }
  });
}

module.exports = monitoring;

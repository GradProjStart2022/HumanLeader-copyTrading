import request from "request";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import _ from "lodash";

require("dotenv").config();

const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

let bodyT = {};

function monitoring(leader) {
  const access_key = leader["ACCESS_KEY"];
  const secret_key = leader["SECRET_KEY"];
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
    if (JSON.stringify(bodyT) !== JSON.stringify(body)) {
      bodyT = body;
      const request = require("request");
      // POST 요청하기

      let body1 = _.cloneDeep(body);
      console.log(body1);
      body1.LEADER_SEQ = leader["LEADER_SEQ"];
      const options = {
        uri: "http://localhost:3020/v1/copytrading",
        method: "POST",

        body: body1,
        json: body1,
      };
      console.log("카피트레이딩 서버에 전송완료");

      request.post(options, function (error, response, body) {
        console.log(response);
      });
    }
  });
}

module.exports = monitoring;

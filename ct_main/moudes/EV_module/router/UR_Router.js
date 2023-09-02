var express = require("express");
var ur_userpost = require("../../UR_moudle/UR_postuser");
var UR_userget = require("../../UR_moudle/UR_getuser");
var router = express.Router();
const request = require("request");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// id로 유저 조회
router.post("/", async function (req, res, next) {
  console.log("app - get user by id request");
  // UR 모듈을 통해 데이터 조회 요청
  var UR_data = await UR_userget.get_user_by_id(req.body.id);
  console.log(`UR_data : ${JSON.stringify(UR_data)}`);
  if (UR_data.length === 0) {
    res.json(0);
  } else {
    res.json(1);
  }
});

// 모든 유저 목록 조회
router.get("/all", async function (req, res, next) {
  console.log("app - get all user list request");
  // UR 모듈을 통해 데이터 조회 요청
  var UR_data = await UR_userget.get_user_all();
  //console.log(`UR_data : ${JSON.stringify(UR_data)}`);
  res.json(UR_data);
});

// 유저 정보 조회
router.get("/info/:id", async function (req, res, next) {
  // UR 모듈을 통해 데이터 조회 요청
  const id = req.params.id;
  var UR_data = await UR_userget.get_userinfo_by_id(id);
  console.log(`UR_data : ${JSON.stringify(UR_data)}`);
  res.json(UR_data);
});

// 유저 미실현손익 조회
router.get("/profit/:id", async function (req, res, next) {
  // UR 모듈을 통해 데이터 조회 요청
  const id = req.params.id;

  var UR_data = await UR_userget.getUserPortfolioValue(id);
  console.log(`UR_data : ${JSON.stringify(UR_data)}`);
  res.json(UR_data);
});

// 회원가입 이벤트 라우터
// xxx:3000/user에서 post로 회원가입시 작동
router.post("/new", async function (req, res, next) {
  data = req.body;
  console.log(req.body);
  res.statusCode = 200;
  res.end("ok");

  // 받은 데이터 확인
  console.log(`EV data: ${JSON.stringify(data)}`);

  // 받은 데이터를 UR모듈의 함수에 전달
  ur_userpost.user_signup(data);
});
// token 등록 라우터
router.post("/token", async function (req, res, next) {
  data = req.body;
  console.log(req.body);
  res.statusCode = 200;
  res.json(1);

  // 받은 데이터 확인
  console.log(`EV data: ${JSON.stringify(data)}`);

  // 받은 데이터를 UR모듈의 함수에 전달
  ur_userpost.fcmPost(data);
});

router.post("/key", async function (req, res, next) {
  data = req.body;
  console.log(req.body);
  res.statusCode = 200;

  const accessKey = data.accessKey;
  const secretKey = data.secretKey;
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
      res.json("Error");
    } else {
      res.json(1);
      // 받은 데이터 확인
      console.log(`EV data: ${JSON.stringify(data)}`);

      // 받은 데이터를 UR모듈의 함수에 전달
      ur_userpost.keyRegist(data);
    }
  });
});

module.exports = router;

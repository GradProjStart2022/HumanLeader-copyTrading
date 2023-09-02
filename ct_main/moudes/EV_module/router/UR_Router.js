var express = require("express");
var ur_userpost = require("../../UR_moudle/UR_postuser");
var UR_userget = require("../../UR_moudle/UR_getuser");
var router = express.Router();

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

// 유저  조회
router.get("/info/:id", async function (req, res, next) {
  // UR 모듈을 통해 데이터 조회 요청
  const id = req.params.id;
  var UR_data = await UR_userget.get_userinfo_by_id(id);
  console.log(`UR_data : ${JSON.stringify(UR_data)}`);
  res.json(UR_data);
});

// 유저 미실현수익 조회
router.get("/ror/:id", async function (req, res, next) {
  // UR 모듈을 통해 데이터 조회 요청
  const id = req.params.id;
  var UR_data = await UR_userget.get_userrorby_id(id);
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
  res.json(1);

  // 받은 데이터 확인
  console.log(`EV data: ${JSON.stringify(data)}`);

  // 받은 데이터를 UR모듈의 함수에 전달
  ur_userpost.keyRegist(data);
});

module.exports = router;

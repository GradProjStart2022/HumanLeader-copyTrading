var express = require("express");
var TK_post = require("../../TK_module/TK_post");

var router = express.Router();

router.post("/", async function (req, res, next) {
  data = req.body;
  data.console.log(req.body);
  res.statusCode = 200;
  res.end("ok");

  // 받은 데이터 확인
  console.log(`EV data: ${JSON.stringify(data)}`);

  // 받은 데이터를 UR모듈의 함수에 전달
  TK_post.fcmPost(data);
});
module.exports = router;

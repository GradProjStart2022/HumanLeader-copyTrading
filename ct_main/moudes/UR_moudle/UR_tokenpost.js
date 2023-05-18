const { json } = require("express");
var db_postdata = require("../DB_module/DB_postdata");

function fcmPost(data) {
  // 받은 데이터 확인
  console.log(`UR data: ${JSON.stringify(data)}`);

  // DB 모듈로 데이터 전달
  db_postdata.PostFcmToken(data);
}

module.exports = {
  fcmPost: fcmPost,
};

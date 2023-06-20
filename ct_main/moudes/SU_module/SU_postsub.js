const DB_postdata = require("../DB_module/DB_postdata");
var db_getdata = require("../DB_module/DB_postdata");

//  리더 구독 추가
async function post_following(data) {
  var DB_data = await DB_postdata.PostFollowing(data);

  return DB_data;
}
// 구독 취소
async function disable_following(data) {
  var DB_data = await DB_postdata.DisableFollowing(data);

  return DB_data;
}

module.exports = {
  post_following: post_following,
  disable_following: disable_following,
};

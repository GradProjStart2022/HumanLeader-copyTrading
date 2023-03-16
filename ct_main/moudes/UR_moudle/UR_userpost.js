// 회원가입
// 유저정보를 받아서 DB에 업데이트


// EV모듈에게 호출됨
// DB모듈을 호출

var db_postdata = require('../DB_module/DB_postdata');


// 회원정보 data를 받아서 DB에 업데이트
function user_signup(data){
    // 받은 데이터 확인
    console.log(`UR data: ${JSON.stringify(data)}`);

    // DB 모듈로 데이터 전달
    db_postdata.POST_user(data);

}


module.exports = {
    user_signup : user_signup,
}
var db_postdata = require('../DB_module/DB_postdata');

// 회원정보 data를 받아서 DB에 업데이트
function leader_new(data){
    // 받은 데이터 확인
    console.log(`UR data: ${JSON.stringify(data)}`);

    // DB 모듈로 데이터 전달
    db_postdata.POST_leader(data);

}

module.exports = {
    leader_new : leader_new,
}
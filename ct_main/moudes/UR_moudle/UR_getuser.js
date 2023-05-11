var db_getdata = require('../DB_module/DB_getdata');

// 모든 유저 목록 조회
async function get_user_all(){

    // DB 모듈을 이용해 전체 유저데이터 불러오기
    var DB_data = await db_getdata.Get_all_user();

    return DB_data

}

module.exports = {
    get_user_all : get_user_all,

}
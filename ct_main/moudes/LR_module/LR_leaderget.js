var db_getdata = require('../DB_module/DB_getdata');


async function get_leader_all(){
    console.log('LR req get');

    // DB 모듈을 이용해 전체 리더데이터 불러오기

    var DB_data = await db_getdata.Get_all_leader();


    return DB_data

}

module.exports = {
    get_leader_all : get_leader_all,
}
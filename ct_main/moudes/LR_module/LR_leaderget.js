var db_getdata = require('../DB_module/DB_getdata');
var tr_getleadrhis = require('../TR_module/TR_gettrade');

async function get_leader_all(){
    console.log('LR req get');

    // DB 모듈을 이용해 전체 리더데이터 불러오기

    var DB_data = await db_getdata.Get_all_leader();


    return DB_data

}

async function get_leaderhis_byID(seq){
    console.log('LR req get');

    // DB 모듈을 이용해 전체 리더데이터 불러오기

    var leader_his = await tr_getleadrhis.TR_getleaderhis_byID(seq);



    return leader_his;

}

module.exports = {
    get_leader_all : get_leader_all,
    get_leaderhis_byID : get_leaderhis_byID,
}
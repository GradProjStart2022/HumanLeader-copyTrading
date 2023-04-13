// 신규 거래를 DB에 기록
const { json } = require('express');
var db_getdata = require('../DB_module/DB_getdata');

async function TR_getleaderhis_byID(seq){
    //TR 모듈을 통해 전달된 데이터 확인
    const leaderhis = await db_getdata.Get_leader_history_byID(seq);
    console.log(`TR data : ${JSON.stringify(leaderhis)}`)
    return leaderhis;

    }


module.exports = {
    TR_getleaderhis_byID : TR_getleaderhis_byID,
}
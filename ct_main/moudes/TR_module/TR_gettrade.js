// 신규 거래를 DB에 기록
const { json } = require('express');
var db_getdata = require('../DB_module/DB_getdata');

async function TR_getleaderhis_byID(seq){
    //TR 모듈을 통해 전달된 데이터 확인
    const leaderhis = await db_getdata.Get_leader_history_byID(seq);
    console.log(`TR data : ${JSON.stringify(leaderhis)}`)
    return leaderhis;

    }

// 모든 거래 데이터 불러오기
async function TR_allusertrade(){
    //TR 모듈을 통해 전달된 데이터 확인
    const data = await db_getdata.Get_all_trade();
    //console.log(`TR data : ${JSON.stringify(data)}`)
    return data;
    }


module.exports = {
    TR_getleaderhis_byID : TR_getleaderhis_byID,
    TR_allusertrade :TR_allusertrade,
}
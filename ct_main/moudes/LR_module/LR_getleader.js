var db_getdata = require("../DB_module/DB_getdata");
var tr_getleadrhis = require("../TR_module/TR_gettrade");

// 모든 리더 목록 조회
async function get_leader_all() {
  console.log("LR req get");

  // DB 모듈을 이용해 전체 리더데이터 불러오기

  var DB_data = await db_getdata.Get_all_leader();

  return DB_data;
}

async function get_leader_byID(seq) {
  console.log("LR req get");

  // DB 모듈을 이용해 전체 리더데이터 불러오기

  var DB_data = await db_getdata.Get_leader_by_id(seq);

  return DB_data;
}

// ID를 통해 해당 리더 검색
async function get_leaderhis_byID(seq) {
  console.log("LR req get");

  // DB 모듈을 이용해 전체 리더데이터 불러오기

  var leader_his = await tr_getleadrhis.TR_getleaderhis_byID(seq);

  return leader_his;
}

async function get_leader_by_publicseq(PUBLIC_SEQ) {
  //SU 모듈을 통해 전달된 데이터 확인

  const sub_data = await db_getdata.Get_leader_by_publicseq(PUBLIC_SEQ);

  return sub_data;
}

module.exports = {
  get_leader_all: get_leader_all,
  get_leaderhis_byID: get_leaderhis_byID,
  get_leader_byID: get_leader_byID,
  get_leader_by_publicseq: get_leader_by_publicseq,
};

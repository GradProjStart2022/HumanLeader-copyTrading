const { Get_sub_by_publicseq } = require("../DB_module/DB_getdata");
var db_getdata = require("../DB_module/DB_getdata");

// 모든 구독 목록 조회
async function get_sub_all() {
  // DB 모듈을 이용해 전체 리더데이터 불러오기
  var DB_data = await db_getdata.Get_all_sub();

  return DB_data;
}

// 해당 리더 SEQ에 해당하는 구독 목록 조회
async function get_subscribe(LEADER_SEQ) {
  //SU 모듈을 통해 전달된 데이터 확인
  console.log(`SU data : ${JSON.stringify(LEADER_SEQ)}`);

  const sub_data = await db_getdata.Get_Sub_User(LEADER_SEQ);
  delete sub_data.meta;

  console.log(`SU_return data :${JSON.stringify(sub_data, null, 2)}`);
  return sub_data;
}

async function isSubed(LEADER_SEQ, PUBLIC_SEQ) {
  //SU 모듈을 통해 전달된 데이터 확인
  console.log(`SU data : ${JSON.stringify(LEADER_SEQ)}`);

  const sub_data = await db_getdata.IsSubed(LEADER_SEQ, PUBLIC_SEQ);
  delete sub_data.meta;

  console.log(`SU_return data :${JSON.stringify(sub_data, null, 2)}`);
  return sub_data;
}

module.exports = {
  get_subscribe: get_subscribe,
  get_sub_all: get_sub_all,
  isSubed: isSubed,
};

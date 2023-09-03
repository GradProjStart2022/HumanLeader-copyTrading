var DB_delete = require("../DB_module/DB_deldata");

// 회원정보 data를 받아서 DB에 업데이트
function del_user(data) {
  // 받은 데이터 확인
  console.log(`UR data: ${JSON.stringify(data)}`);
  DB_delete.DEL_public(data);
}

function del_token(id) {
  // 받은 데이터 확인
  console.log(`UR data: ${JSON.stringify(data)}`);
  DB_delete.DEL_token(id);
}

function del_token(id){
    // 받은 데이터 확인
    console.log(`UR data: ${JSON.stringify(data)}`);
    DB_delete.DEL_token(id)
}

function del_token(id){
    // 받은 데이터 확인
    console.log(`UR data: ${JSON.stringify(data)}`);
    DB_delete.DEL_token(id)
}

module.exports = {
  del_user: del_user,
  del_token:del_token
};

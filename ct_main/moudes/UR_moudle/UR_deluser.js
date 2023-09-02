var DB_delete = require('../DB_module/DB_deldata')

// 회원정보 data를 받아서 DB에 업데이트
function del_user(data) {
    // 받은 데이터 확인
    console.log(`UR data: ${JSON.stringify(data)}`);
    DB_delete.DEL_public(data)
  
}

module.exports = {
    del_user: del_user,
};

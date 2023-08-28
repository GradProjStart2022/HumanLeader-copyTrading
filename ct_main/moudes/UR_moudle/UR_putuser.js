var DB_putdata = require('../DB_module/DB_putdata')

// 회원정보 data를 받아서 DB에 업데이트
function put_user(data) {
  // 받은 데이터 확인
  console.log(`UR data: ${JSON.stringify(data)}`);

  DB_putdata.PUT_public(data);
}

module.exports = {
    put_user: put_user,
};

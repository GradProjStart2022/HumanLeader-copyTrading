var db_postdata = require("../DB_module/DB_postdata");
var db_putdata = require('../DB_module/DB_putdata');

// 회원정보 data를 받아서 DB에 업데이트
function newalalrm(data) {
  // 받은 데이터 확인
  console.log(`UR data: ${JSON.stringify(data)}`);

  // DB 모듈로 데이터 전달
  db_postdata.POST_alarm(data);
}

// 특정 알람을 읽음으로 표시
function alarm_isread(alarm_seq){
  console.log('AL / alarmseq: ',alarm_seq)
  db_putdata.PUT_alarm_isread(alarm_seq);
}

module.exports = {
    newalalrm: newalalrm,
    alarm_isread : alarm_isread,
};

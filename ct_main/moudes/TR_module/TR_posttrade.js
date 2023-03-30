// 신규 거래를 DB에 기록
var db_postdata = require('../DB_module/DB_postdata');

function trade_postLtrade(data){
    //TR 모듈을 통해 전달된 데이터 확인
    console.log(`TR data : ${JSON.stringify(data)}`);

    //DB모듈을 이용해 러더 거래 DB에 갱신
    db_postdata.POST_LT_history(data);
    console.log('리더 거래기록 갱신 완료');

    }


module.exports = {
    trade_postLtrade : trade_postLtrade,
}
var express = require('express');
var tr_post = require('../../TR_module/TR_posttrade');
var sub_get = require('../../SU_module/SU_getsub');

var router = express.Router();

var telegramBot = require('../Trigger/TR_testbot');

// Leader trader의 새로운 거래기록 발생
router.post('/', async function(req, res, next) {
    
    // body 데이터 오브젝트화
    body = req.body;
    console.log(body);
    res.statusCode = 200;
    
    // TR모듈을 이용하여 거래 갱신
    tr_post.trade_postLtrade(body);
    LEADER_SEQ = body.LEADER_SEQ;
    console.log('거래발생 리더SEQ : ',body.LEADER_SEQ);



    // SUB 모듈을 통해 구독정보조회
    console.log('해당 리더의 구독자정보를 조회합니다.');

    sub_data = await sub_get.get_subscribe(LEADER_SEQ);

    console.log(`router_get data :${JSON.stringify(sub_data, null, 2)}`);

    // TR 모듈을 이용하여 알람요청 이벤트를 발생시킵니다.  
    telegramBot.sendmessage(
        `
        ----------------------------------------
        수신 데이터 : ${JSON.stringify(sub_data, null, 2)}
        ----------------------------------------
        `
        )

    for (var i =0; i < sub_data.length; i++ ) {
        telegramBot.sendmessage(`
            ----------------------------------------
            유저아이디 ${sub_data[i].PUBLIC_SEQ}의 계좌로 거래요청

            거래타입 : ${sub_data[i].COPY_TRADE_TYPE} 
            리더 거래금액 : ${body.TRADE_PRICE}
            리더 거래시장 : ${body.TRADE_MARKET}
            ----------------------------------------`);
        console.log(`
            ----------------------------------------
            유저아이디 ${sub_data[i].PUBLIC_SEQ}의 계좌로 거래요청

            거래타입 : ${sub_data[i].COPY_TRADE_TYPE} 
            리더 거래금액 : ${body.TRADE_PRICE}
            리더 거래시장 : ${body.TRADE_MARKET}
            ----------------------------------------`);
    }

    res.end('ok');
    

});


module.exports = router;
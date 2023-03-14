const { json } = require('express');
var express = require('express');
var db_getdata = require('../../DB_module/DB_getdata');
var db_postdata = require('../../DB_module/DB_postdata');
var router = express.Router();

// Leader trader의 새로운 거래기록 발생
router.post('/', async function(req, res, next) {
    
    body = req.body;
    console.log(body)
    res.statusCode = 200
    res.end('ok');

    
    db_postdata.POST_LT_history(body);
    console.log('리더 거래기록 갱신 완료')
    LEADER_SEQ = body.LEADER_SEQ
    console.log('거래발생 리더순번 : ',body.LEADER_SEQ)

    console.log('구독자를 조회합니다.')
    const sub_data = await db_getdata.Get_Sub_User(LEADER_SEQ)
    delete sub_data.meta
    console.log(sub_data)
    
    for (var i =0; i < sub_data.length; i++ ) {
        console.log(`
            ${sub_data[i].PUBLIC_SEQ}의 계좌로 거래요청
            거래타입 : ${sub_data[i].COPY_TRADE_TYPE} 
            리더 거래금액 : ${body.TRADE_PRICE}
            리더 거래시장 : ${body.TRADE_MARKET}
        `)
    }
    

});


module.exports = router;
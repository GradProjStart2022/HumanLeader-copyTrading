var express = require("express");
var tr_post = require("../../TR_module/TR_posttrade");
var sub_get = require("../../SU_module/SU_getsub");
var al_post = require("../../AL_module/AL_postdata");
var DB_post = require('../../DB_module/DB_postdata')

var router = express.Router();

var telegramBot = require("../Trigger/TR_testbot");
var TR_app_autotrade = require("../Trigger/TR_app_autotrade");

var TR_gettrade = require("../../TR_module/TR_gettrade");

// 모든 거래 기록 조회
router.get("/all", async function (req, res, next) {
  console.log("app - get all user trade recode request");
  var TR_data = await TR_gettrade.TR_allusertrade();
  //console.log(`LR data : ${JSON.stringify(LR_data)}`);
  res.json(TR_data);
});

// Leader trader의 새로운 거래기록 발생
router.post("/newtrade", async function (req, res, next) {
  // body 데이터 오브젝트화
  body = req.body;
  console.log(body);
  res.statusCode = 200;

  // TR모듈을 이용하여 거래 갱신
  tr_post.trade_postLtrade(body);
  LEADER_SEQ = body.LEADER_SEQ;
  console.log("거래발생 리더SEQ : ", body.LEADER_SEQ);

  // SUB 모듈을 통해 구독정보조회
  console.log("해당 리더의 구독자정보를 조회합니다.");
  sub_data = await sub_get.get_subscribe(LEADER_SEQ);

  // 구독정보에서 FOLLOWING_SEQ만 리스트의 형태로 추출
  const following_data  = await sub_data.map(item => item.FOLLOWING_SEQ);
  console.log('following: ',following_data);
  // 구독번호에 해당하는 기기에 알람 전송
  for (const F of following_data){
    let temp = {
      FOLLOWING_SEQ : F,
      TRADE_TYPE : req.body.TRADE_TYPE,
      TRADE_SYMBOL : req.body.TRADE_SYMBOL,
      TRADE_MARKET : req.body.TRADE_MARKET,
      TRADE_PRICE : req.body.TRADE_PRICE,
      TRADE_VOLUME : req.body.TRADE_VOLUME,
      IS_READ_YN : 'N',
      TRADE_YN : 'Y',
      IS_AUTOTRADE_YN : 'Y',
      CONTENTS : 'NULL',
      REG_DT : req.body.REG_DT
    }
    await console.log('temp: ',temp)
    await DB_post.POST_alarm(temp);
  }

  //console.log(`router_get data :${JSON.stringify(sub_data, null, 2)}`);
  

  // TR 모듈을 이용하여 알람요청 이벤트를 발생시킵니다.
  /*
  telegramBot.sendmessage(
    `
        ----------------------------------------
        수신 데이터 : ${JSON.stringify(sub_data, null, 2)}
        ----------------------------------------
        `
  );

  for (var i = 0; i < sub_data.length; i++) {
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
  */


  // TR 모듈을 통해 FCM 메세지 전송
  //TR_app_autotrade("test title", "test body");

  res.end("ok");
});

module.exports = router;

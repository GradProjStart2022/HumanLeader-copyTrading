const { response } = require("express")

const autoTrade_message =  async (data) => {

    // 하드코딩 데이터
    const ACCESS_TOKEN = "ya29.a0Ael9sCN5OD1Teva2SpRhn-fXOB1mI3-XndaTXOq8_VAdprxHXQ58hbeKjUSDzALpguHCnbTkFaNsnvg6ymSludT36_KnGbnpwgJeq3vpXQ85H15hj2iyoPkLTza-H8Vd7ssZVFLjtHaUsLpUNtLxP8E9rUb4aCgYKAR8SARMSFQF4udJhxL9Oz_WNEGvjVcVmgB1lGA0163"
    const URL = "fcm.googleapis.com/v1/projects/hlcopybot/messages:send"
        
    // 메세지 데이터
    const FCM_TOKEN = data.FCM_TOKEN
    const LEADER_NAME = data.LEADER_NAME
    const LEADER_SEQ = data.LEADER_SEQ
    const TRADE_TYPE = data.TRADE_TYPE
    const TRADE_VOLUME = data.TRADE_VOLUME
    const TRADE_PRICE = data.TRADE_PRICE
    const IS_AUTOTRADE_YN = data.IS_AUTOTRADE_YN
    const REG_DT = data.REG_DT
    
    let postdata = {
        "to": FCM_TOKEN,
        "notification": {
          "title": (IS_AUTOTRADE_YN == 'Y') ? '자동 거래 알림' : '수동 거래 알림',
          "body": `팔로우 하신 ${LEADER_NAME}님 계좌에서 거래가 발생하였습니다.`
        },
        "data":{
              "LEADER_SEQ": LEADER_SEQ,
              "TRADE_TYPE": TRADE_TYPE, // TT01: 매수, TT02: 매도 
              "TRADE_VOLUME" : TRADE_VOLUME,
              "TRADE_PRICE" : TRADE_PRICE,
              "IS_AUTOTRADE_YN": IS_AUTOTRADE_YN, 
              "TRADE_YN" : "Y", // follower 계좌에서 거래가 발생할 경우 Y, 아닐 경우 N
              "REG_DT": REG_DT
      
          }
      }

    await console.log('postdata: ',postdata);

    fetch(`${URL}`, {
        method: 'POST', 
        headers: {
            'Authorization' : `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata),
        })
    .then((response) => response.json())
    .then((postdata) => {
    console.log('성공:', postdata);
    console.log(response)
    })
    .catch((error) => {
    console.error('실패:', error);
    });

}

module.exports = autoTrade_message
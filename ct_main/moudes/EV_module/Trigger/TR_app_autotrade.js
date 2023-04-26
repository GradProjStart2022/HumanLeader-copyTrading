const { response } = require("express")

function autoTrade_message(title, body){
    const FCM_TOKEN = "ya29.a0Ael9sCOGdloPWmmg8Ez7kv8ld8CjHFi-3P0nBRH3P7mO8tn66Jh7ZrDjzK3MaWEksIe2R4FUDJvC5DY0WkCut-BOqfqwzvtDqAfkgLo1v-MOy0dKbARmimwcpRwhgAeiUynVjKkEV8AI_OTRxXWPYMKNGGr1aCgYKATESARESFQF4udJhDQqNTGXPns_blbp0e4Jvbw0163" // 현장에서 발급
    const DIVICE_TOKEN = "eYJkPvGFR42BLyoklQHUhQ:APA91bGFlVQkFixLjrH-RpqKBxRlvqUFzFxtxVnLJNVlUCmK0GztLBCPy2gR2iQn_tE4tbFz47FBFG4qt6LeXMAL7B2Ft5YMqrFKc29XGsYvrlOPWcKUkds-LE-Qt_QQcqSmJ21M9Xjk"
    const URL = "https://fcm.googleapis.com/v1/projects/hlcopybot/messages:send"
    
    let postdata = {
        "message": {
            "token": `${DIVICE_TOKEN}`,
            "notification": {
              "body": `${body}`,
              "title": `${title}`
            }
        }
    }

    console.log(`${JSON.stringify(postdata)}`);

    fetch(`${URL}`, {
        method: 'POST', 
        headers: {
            'Authorization' : `Bearer ${FCM_TOKEN}`,
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

module.exports = {
    autoTrade_message : autoTrade_message,
}
const { response } = require("express")

const autoTrade_message = (title, body) => {
    const FCM_TOKEN = "fEFL7n-CQ8yvE6hA2pjxoK:APA91bHs5xig6T3RJyn0FPOTxpWsFw2XHpeBARQk5m7CXbPOfpZFV1Ch_O1kuMggGpE9iIImoXDLhQjIdXA4o7nU4N0kBd8Qy8Sa8COld6Dy8r-fhL2SFICPe87nhTZZidbGYcp_j9jV" // 현장에서 발급
    const DIVICE_TOKEN = "ya29.a0Ael9sCN5OD1Teva2SpRhn-fXOB1mI3-XndaTXOq8_VAdprxHXQ58hbeKjUSDzALpguHCnbTkFaNsnvg6ymSludT36_KnGbnpwgJeq3vpXQ85H15hj2iyoPkLTza-H8Vd7ssZVFLjtHaUsLpUNtLxP8E9rUb4aCgYKAR8SARMSFQF4udJhxL9Oz_WNEGvjVcVmgB1lGA0163"
    const URL = "fcm.googleapis.com/v1/projects/hlcopybot/messages:send"
    
    let postdata = {
        "message": {
            "token": `${FCM_TOKEN}`,
            "notification": {
              "body": `${body}`,
              "title": `${title}`
            }
        }
    }

    fetch(`${URL}`, {
        method: 'POST', 
        headers: {
            'Authorization' : `Bearer ${DIVICE_TOKEN}`,
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

export default autoTrade_message
const TelegramBot = require('node-telegram-bot-api');

// 발급받은 봇 토큰 입력
const token = '6072145282:AAFtxxk2XdQ124whODgCOOMwrIXb1985lss';
// 신규 봇 생성 및 업데이트사항 풀링
const bot = new TelegramBot(token, {polling: true});

console.log(`테스트용 텔레그렘 봇 생성 완료`);

var CI;
console.log(CI == null);

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    CI = chatId;
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your chat ID');
    bot.sendMessage(chatId, 'chat ID가 등록되었습니다.');
    console.log(CI == null);
  });

function sendmessage(data){
    if (CI == null){
        console.log(
            `
            ---------------------------------------\n
            testbot : send first chat to get chatID\n
            ---------------------------------------\n
            `
            )
        }
    else{
        bot.sendMessage(CI,`${data}`);
    }
}


module.exports = {
    sendmessage : sendmessage,
}


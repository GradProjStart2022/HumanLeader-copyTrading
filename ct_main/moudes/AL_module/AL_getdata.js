var DB_getdata = require('../DB_module/DB_getdata')

// 모든 알람 조회
async function get_allalarm(){
    const data = await DB_getdata.Get_all_alarm();
    console.log('AL data: ',data);
    return data;
}

// 특정 유저 알람 조회
async function get_alarm_bypublic(public_seq){
    console.log('AL / public seq: ',public_seq);
    const data = await DB_getdata.Get_alarm_bypublic(public_seq);
    return data;
}
module.exports = {
    get_allalarm: get_allalarm,
    get_alarm_bypublic: get_alarm_bypublic,
};

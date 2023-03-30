var db_getdata = require('../DB_module/DB_getdata');

async function get_subscribe(LEADER_SEQ){
    //SU 모듈을 통해 전달된 데이터 확인
    console.log(`SU data : ${JSON.stringify(LEADER_SEQ)}`);

    const sub_data = await db_getdata.Get_Sub_User(LEADER_SEQ)
    delete sub_data.meta
    
    console.log(`SU_return data :${JSON.stringify(sub_data, null, 2)}`);
    return sub_data;

}

module.exports = {
    get_subscribe : get_subscribe,
}
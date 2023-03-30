const mariadb = require('mariadb');
const vals = require('./DB_info.js');

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
    host: vals.DBhost, port:vals.DBport,
    user: vals.DBuser, password: vals.DBpass,
    connectionLimit: 5
});

// LEADER_SEQ 를 받아 해당 리더를 구독하는 사용자의 PUBLIC_SEQ, COPY_TRADE_TYPE를 받아옴
async function Get_Sub_User(LEADER_SEQ){
    let conn, rows;
    try{
        
        conn = await pool.getConnection();
        conn.query('USE copytrade_proto;');
        rows = await conn.query(`select * from ct_following where LEADER_SEQ = ${LEADER_SEQ};`);
        //console.log(rows)
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        //console.log(rows)
        return rows;
    }
}

async function Get_all_leader(){
    let conn, rows;
    try{
        
        conn = await pool.getConnection();
        conn.query('USE copytrade_proto;');
        rows = await conn.query(`select LEADER_SEQ,LEADER_UID,LEADER_NAME,LEADER_IMAGE,LEADER_CAPACITY,LEADER_PRICE,LEADER_AMOUNT,EXCHANGE_TYPE,TRADER_ST from ct_leader;`);
        //console.log(rows)
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        //console.log(rows)
        return rows;
    }
}

module.exports = {

    Get_Sub_User: Get_Sub_User,
    Get_all_leader : Get_all_leader,
}
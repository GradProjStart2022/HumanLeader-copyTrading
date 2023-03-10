const mariadb = require('mariadb');
const vals = require('./db_info.js');

// 테이블과 접속을 윈한 connection pool을 설정합니다. 
const pool = mariadb.createPool({
    host: vals.DBhost, port:vals.DBport,
    user: vals.DBuser, password: vals.DBpass,
    connectionLimit: 5
});

// 테이블에서 Leader trade history를 조회하여 return  합니다.
async function Get_LT_history(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE test_db');
        rows = await conn.query('SELECT * FROM ct_leader_history');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}

// 테이블에서 Leader 정보를 조회하여 return  합니다.
async function Get_LT_info(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE test_db');
        rows = await conn.query('SELECT * FROM ct_leader');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}


// ct_leader_history에 거래기록 추가
async function PUT_LT_history(data){

    
    LEADER_SEQ = data.LEADER_SEQ
    HISTORY_NUM = data.HISTORY_NUM
    TRADE_TYPE = data.TRADE_TYPE
    TRADE_SYMBOL = data.TRADE_SYMBOL
    TRADE_MARKET = data.TRADE_MARKET
    TRADE_PRICE = data.TRADE_PRICE
    TRADE_VOLUME = data.TRADE_VOLUME
    REG_DT = data.REG_DT
    
    let conn, rows;
    try{
        console.log(`INSERT INTO ct_leader_history (LEADER_SEQ, HISTORY_NUM, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_PRICE, TRADE_VOLUME, REG_DT) VALUES (${LEADER_SEQ}, '${HISTORY_NUM}', '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_PRICE}, ${TRADE_VOLUME}, '${REG_DT}')`)
        
        conn = await pool.getConnection();
        conn.query('USE test_db');
        rows = await conn.query(`INSERT INTO ct_leader_history (LEADER_SEQ, HISTORY_NUM, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_PRICE, TRADE_VOLUME, REG_DT) VALUES (${LEADER_SEQ}, '${HISTORY_NUM}', '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_PRICE}, ${TRADE_VOLUME}, '${REG_DT}')`);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
    
}

// LEADER_SEQ 를 받아 해당 리더를 구독하는 사용자의 USER_SEQ, TRADE_RATIO를 받아옴
async function Get_Sub_User(LEADER_SEQ){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE test_db');
        rows = await conn.query(`select USER_SEQ, TRADE_RATIO from ct_subscribe where LEADER_SEQ = ${LEADER_SEQ};`);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}


/*
db접속 예제

Get_LT_history()
  .then((rows) => {
    console.log(rows);
    return;
  })
  .catch((errMsg) => {
    console.log(errMsg);
    return;
  });
*/

 
module.exports = {
    Get_LT_history: Get_LT_history,
    Get_LT_info: Get_LT_info,
    PUT_LT_history: PUT_LT_history,
    Get_Sub_User: Get_Sub_User
}

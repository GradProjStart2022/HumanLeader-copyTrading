const mariadb = require('mariadb');
const vals = require('./DB_info.js');

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
    host: vals.DBhost, port:vals.DBport,
    user: vals.DBuser, password: vals.DBpass,
    connectionLimit: 5
});

// ct_leader_history에 거래기록 추가
// data : 거래기록
async function POST_LT_history(data){
    
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
        //console.log(`INSERT INTO ct_leader_history (LEADER_SEQ, HISTORY_NUM, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_PRICE, TRADE_VOLUME, REG_DT) VALUES (${LEADER_SEQ}, '${HISTORY_NUM}', '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_PRICE}, ${TRADE_VOLUME}, '${REG_DT}')`)
        
        conn = await pool.getConnection();
        conn.query('USE copytrade_proto');
        rows = await conn.query(`INSERT INTO ct_leader_history (LEADER_SEQ, HISTORY_NUM, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_PRICE, TRADE_VOLUME, REG_DT) VALUES (${LEADER_SEQ}, '${HISTORY_NUM}', '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_PRICE}, ${TRADE_VOLUME}, '${REG_DT}')`);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        console.log(rows)
        return rows[0];
    }
    
}


// UR 모듈에서 유저 데이터를 받아 DB를 업데이트
async function POST_user(data){

    console.log(`DB data : ${JSON.stringify(data)}`)

    PUBLIC_ID = data.PUBLIC_ID
    PUBLIC_ST = data.PUBLIC_ST
    REG_DT = data.REG_DT
    MOD_DT = data.MOD_DT
    ACCESS_KEY = data.ACCESS_KEY
    SECRET_KEY = data.SECRET_KEY

    let conn, output;
    try{
        conn = await pool.getConnection();
        conn.query('USE copytrade_proto');
        console.log(`INSERT INTO ct_public (PUBLIC_ID, PUBLIC_ST, REG_DT, MOD_DT, ACCESS_KEY, SECRET_KEY) VALUES (${PUBLIC_ID}, '${PUBLIC_ST}', '${REG_DT}', '${MOD_DT}', '${ACCESS_KEY}', '${SECRET_KEY}')`)
        output = await conn.query(`INSERT INTO ct_public (PUBLIC_ID, PUBLIC_ST, REG_DT, MOD_DT, ACCESS_KEY, SECRET_KEY) VALUES (${PUBLIC_ID}, '${PUBLIC_ST}', '${REG_DT}', '${MOD_DT}', '${ACCESS_KEY}', '${SECRET_KEY}');`)
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end()
        console.log(output)
        return;
    }
    
}

module.exports = {

    POST_LT_history: POST_LT_history,
    POST_user : POST_user

}
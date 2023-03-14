const mariadb = require('mariadb');
const vals = require('./db_info.js');

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

module.exports = {

    POST_LT_history: POST_LT_history,

}
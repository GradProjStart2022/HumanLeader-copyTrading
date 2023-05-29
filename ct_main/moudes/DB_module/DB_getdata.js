const mariadb = require("mariadb");
const vals = require("./DB_info.js");

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
  host: vals.DBhost,
  port: vals.DBport,
  user: vals.DBuser,
  password: vals.DBpass,
  connectionLimit: 5,
});

// LEADER_SEQ 를 받아 해당 리더를 구독하는 사용자의 PUBLIC_SEQ, COPY_TRADE_TYPE를 받아옴
async function Get_Sub_User(LEADER_SEQ) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `select * from ct_following where LEADER_SEQ = ${LEADER_SEQ};`
    );
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

// 모든 리더목록을 DB에서 불러오기
async function Get_all_leader() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    //rows = await conn.query(`select * from ct_leader;`);
    rows = await conn.query(
      `select LEADER_SEQ,LEADER_UID,LEADER_NAME,LEADER_IMAGE,LEADER_CAPACITY,LEADER_PRICE,LEADER_AMOUNT,EXCHANGE_TYPE,TRADER_ST from ct_leader;`
    );
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

//모든 유저 트레이드 내역을 불러오기
async function Get_all_trade() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`select * from ct_trading_history;`);
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

//모든 구독 목록을 불러오기
async function Get_all_sub() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`select * from ct_following;`);
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

//모든 유저 목록을 불러오기
async function Get_all_user() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`select * from ct_public;`);
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

async function Get_user_by_id(id) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query("select PUBLIC_ID from ct_public where id=?", [id]);

    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

// 리더 SEQ를 통해 리더 거래목록 조회
async function Get_leader_history_byID(seq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `select TRADE_TYPE, TRADE_PRICE,TRADE_VOLUME,REG_DT from ct_leader_history where LEADER_SEQ = ${seq};`
    );
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

//특정 유저 id로 불러오기
async function Get_user_by_id(id) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      "select PUBLIC_ID from ct_public where PUBLIC_ID=?",
      [id]
    );

    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

module.exports = {
  Get_Sub_User: Get_Sub_User,
  Get_all_leader: Get_all_leader,
  Get_leader_history_byID: Get_leader_history_byID,
  Get_all_trade: Get_all_trade,
  Get_all_sub: Get_all_sub,
  Get_all_user: Get_all_user,
  Get_user_by_id: Get_user_by_id,
};

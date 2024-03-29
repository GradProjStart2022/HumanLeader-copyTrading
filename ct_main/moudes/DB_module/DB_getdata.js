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
      `select LEADER_SEQ,LEADER_UID,LEADER_NAME,LEADER_IMAGE,LEADER_CAPACITY,LEADER_PRICE,LEADER_AMOUNT,EXCHANGE_TYPE,TRADER_ST,ACCESS_KEY,SECRET_KEY from ct_leader;`
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
async function Get_leader_by_id(id) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `SELECT 
      ct_leader.LEADER_SEQ,LEADER_UID,LEADER_NAME,LEADER_IMAGE,LEADER_CAPACITY,LEADER_PRICE,LEADER_AMOUNT,EXCHANGE_TYPE,TRADER_ST,ct_leader.REG_DT,
      IF(ct_following.LEADER_SEQ IS NULL, 'N', 'Y') AS SUBSCRIBED
    FROM
      ct_leader
      LEFT JOIN ct_following ON ct_leader.LEADER_UID = ct_following.LEADER_SEQ
    WHERE
      ct_leader.LEADER_SEQ = ?`,
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

// 리더 SEQ를 통해 리더 거래목록 조회
async function Get_leader_history_byID(seq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `select LEADER_HISTORY_SEQ,TRADE_TYPE, TRADE_PRICE,TRADE_VOLUME,REG_DT,AVG_BUY_PRICE from ct_leader_history where LEADER_SEQ = ${seq};`
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

// 리더 SEQ를 통해 리더이름만 조회
async function Get_leader_name_byID(seq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `select  LEADER_NAME from ct_leader where LEADER_SEQ = ${seq};`
    );
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows[0].LEADER_NAME;
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

async function Get_userinfo_by_id(id) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      "select PUBLIC_SEQ, PUBLIC_ID, TOKEN from ct_public where PUBLIC_ID=?",
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

async function IsSubed(leaderSeq, publicSeq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `SELECT EXISTS (
        SELECT 1
        FROM ct_following
        WHERE LEADER_SEQ = ?
          AND PUBLIC_SEQ = ?
          AND FOLLOWING_ST = 'FS01'
      ) AS result;`,
      [leaderSeq, publicSeq]
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

async function Get_leader_by_publicseq(publicSeq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      `SELECT 
      cl.LEADER_SEQ, cl.LEADER_UID, cl.LEADER_NAME, cl.LEADER_IMAGE, cl.LEADER_CAPACITY, cl.LEADER_PRICE, cl.LEADER_AMOUNT, cl.EXCHANGE_TYPE, cl.TRADER_ST
      FROM ct_leader cl
      WHERE
      cl.LEADER_SEQ IN (SELECT LEADER_SEQ from ct_following cf  where PUBLIC_SEQ = ? and FOLLOWING_ST = "FS01")
      `,
      [publicSeq]
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

//특정 유저 키 id로 불러오기
async function GetUserKey(id) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(
      "SELECT ACCESS_KEY, SECRET_KEY FROM ct_public WHERE PUBLIC_SEQ = ?",
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

async function Get_apptext() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`select * from ct_app_text`);

    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

//모든 알람 목록을 불러오기
async function Get_all_alarm() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`select * from ct_alarm_history;`);
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

// 유저 seq를 받아 관련된 모든 알람 조회
async function Get_alarm_bypublic(public_seq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`
    SELECT
        a.ALARM_SEQ,
        f.LEADER_SEQ AS LEADER_SEQ, -- 해당 FOLLOWING_SEQ에 대응하는 LEADER_SEQ
        l.LEADER_NAME AS LEADER_NAME,
        a.IS_AUTOTRADE_YN,
        a.IS_READ_YN,
        a.REG_DT,
        a.TRADE_MARKET,
        a.TRADE_PRICE,
        a.TRADE_SYMBOL,
        a.TRADE_TYPE,
        a.TRADE_VOLUME,
        a.TRADE_YN
      FROM ct_alarm_history a
      INNER JOIN ct_public p
      LEFT JOIN ct_following f ON a.FOLLOWING_SEQ = f.FOLLOWING_SEQ
      LEFT JOIN ct_leader l ON f.LEADER_SEQ = l.LEADER_SEQ
      WHERE p.PUBLIC_SEQ = '${public_seq}';
    `);
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    //console.log(rows)
    return rows;
  }
}

// 팔로잉 seq를 받아 자동거래여부 출력
async function Get_following_isauto(FOLLOWING_SEQ) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`
    SELECT IS_AUTO_TRADING_YN,PUBLIC_SEQ
    FROM ct_following
    WHERE FOLLOWING_SEQ = ${FOLLOWING_SEQ};
    `);
    //console.log(rows)
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    // console.log("DB log: ",rows[0])
    return rows[0];
  }
}

// 사용자 seq를 받아 토큰 출력
async function Get_token_bypublic(PUBLIC_SEQ) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`
    SELECT TOKEN
    FROM ct_public
    WHERE PUBLIC_SEQ = ${PUBLIC_SEQ};
    `);
    //console.log(rows)
  } catch (err) {
    s;
    throw err;
  } finally {
    if (conn) conn.end();
    console.log("Token log: ", rows[0].TOKEN);
    return rows[0].TOKEN;
  }
}

module.exports = {
  Get_Sub_User: Get_Sub_User,
  Get_all_leader: Get_all_leader,
  Get_leader_history_byID: Get_leader_history_byID,
  Get_leader_name_byID: Get_leader_name_byID,
  Get_all_trade: Get_all_trade,
  Get_all_sub: Get_all_sub,
  Get_all_user: Get_all_user,
  Get_user_by_id: Get_user_by_id,
  Get_leader_by_id: Get_leader_by_id,
  Get_userinfo_by_id: Get_userinfo_by_id,
  IsSubed: IsSubed,
  Get_leader_by_publicseq: Get_leader_by_publicseq,
  GetUserKey: GetUserKey,
  Get_apptext: Get_apptext,
  Get_all_alarm: Get_all_alarm,
  Get_alarm_bypublic: Get_alarm_bypublic,
  Get_following_isauto: Get_following_isauto,
  Get_token_bypublic: Get_token_bypublic,
};

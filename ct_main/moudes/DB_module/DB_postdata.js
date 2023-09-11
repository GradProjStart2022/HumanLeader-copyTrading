const mariadb = require("mariadb");
const vals = require("./DB_info.js");

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
  host: vals.DBhost,
  port: vals.DBport,
  user: vals.DBuser,
  password: vals.DBpass,
});

// ct_leader_history에 거래기록 추가
// data : 거래기록
async function POST_LT_history(data) {
  LEADER_SEQ = data.LEADER_SEQ;
  HISTORY_NUM = data.HISTORY_NUM;
  TRADE_TYPE = data.TRADE_TYPE;
  TRADE_SYMBOL = data.TRADE_SYMBOL;
  TRADE_MARKET = data.TRADE_MARKET;
  TRADE_PRICE = data.TRADE_PRICE;
  TRADE_VOLUME = data.TRADE_VOLUME;
  REG_DT = data.REG_DT;

  let conn, rows;
  try {
    //console.log(`INSERT INTO ct_leader_history (LEADER_SEQ, HISTORY_NUM, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_PRICE, TRADE_VOLUME, REG_DT) VALUES (${LEADER_SEQ}, '${HISTORY_NUM}', '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_PRICE}, ${TRADE_VOLUME}, '${REG_DT}')`)

    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    rows = await conn.query(
      `INSERT INTO ct_leader_history (LEADER_SEQ, HISTORY_NUM, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_PRICE, TRADE_VOLUME, REG_DT) VALUES (${LEADER_SEQ}, '${HISTORY_NUM}', '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_PRICE}, ${TRADE_VOLUME}, '${REG_DT}')`
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(rows);
    return rows[0];
  }
}

// UR 모듈에서 유저 데이터를 받아 DB를 업데이트
async function POST_user(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  PUBLIC_ID = data.PUBLIC_ID;
  PUBLIC_ST = data.PUBLIC_ST;
  REG_DT = data.REG_DT;
  MOD_DT = data.MOD_DT;
  ACCESS_KEY = data.ACCESS_KEY;
  SECRET_KEY = data.SECRET_KEY;

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log(
      `INSERT INTO ct_public (PUBLIC_ID, PUBLIC_ST, REG_DT, MOD_DT, ACCESS_KEY, SECRET_KEY) VALUES ('${PUBLIC_ID}', '${PUBLIC_ST}', '${REG_DT}', '${MOD_DT}', '${ACCESS_KEY}', '${SECRET_KEY}')`
    );
    output = await conn.query(
      `INSERT INTO ct_public (PUBLIC_ID, PUBLIC_ST, REG_DT, MOD_DT, ACCESS_KEY, SECRET_KEY) VALUES ('${PUBLIC_ID}', '${PUBLIC_ST}', '${REG_DT}', '${MOD_DT}', '${ACCESS_KEY}', '${SECRET_KEY}');`
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}
// app 유저 회원가입
async function POST_public(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  PUBLIC_ID = data.id;
  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log(`INSERT INTO ct_public (PUBLIC_ID) VALUES ('${PUBLIC_ID}')`);
    var query = "INSERT INTO ct_public (PUBLIC_ID) VALUES (?)";
    output = await conn.query(query, [PUBLIC_ID]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}
// 신규 리더 정보 DB 등록
async function POST_leader(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  LEADER_UID = data.LEADER_UID;
  LEADER_NAME = data.LEADER_NAME;
  LEADER_IMAGE = data.LEADER_IMAGE;
  LEADER_CAPACITY = data.LEADER_CAPACITY;
  LEADER_PRICE = data.LEADER_PRICE;
  LEADER_AMOUNT = data.LEADER_AMOUNT;
  EXCHANGE_TYPE = data.EXCHANGE_TYPE;
  ACCESS_KEY = data.ACCESS_KEY;
  SECRET_KEY = data.SECRET_KEY;
  TRADER_ST = data.TRADER_ST;
  REG_DT = data.REG_DT;
  MOD_DT = data.MOD_DT;

  const SQLquery =
    await `INSERT INTO ct_leader (LEADER_UID, LEADER_NAME, LEADER_IMAGE, LEADER_CAPACITY, LEADER_PRICE, LEADER_AMOUNT, EXCHANGE_TYPE, ACCESS_KEY, SECRET_KEY, TRADER_ST, REG_DT, MOD_DT ) VALUES ('${LEADER_UID}', '${LEADER_NAME}', '${LEADER_IMAGE}', '${LEADER_CAPACITY}', '${LEADER_PRICE}', '${LEADER_AMOUNT}','${EXCHANGE_TYPE}', '${ACCESS_KEY}', '${SECRET_KEY}','${TRADER_ST}','${REG_DT}','${MOD_DT}');`;
  console.log('SQL query',SQLquery);

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");
    console.log(
     `${SQLquery}`
    );
    output = await conn.query(
      `${SQLquery}`
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}

// 신규 FCM TOKEN 등록
async function PostFcmToken(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  PUBLIC_ID = data.id;
  TOKEN = data.token;

  const query = await "UPDATE ct_public SET TOKEN=? WHERE PUBLIC_ID = ?";
  console.log(query);

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");
    console.log(
      `DB query :  "UPDATE ct_public SET (TOKEN=${TOKEN}) where PUBLIC_ID = (${PUBLIC_ID})`
    );
    output = await conn.query(query, [TOKEN, PUBLIC_ID]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}

// 신규 access key, secret key 등록
async function PostKey(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  const PUBLIC_ID = data.id;
  const ACCESS_KEY = data.accessKey;
  const SECRET_KEY = data.secretKey;

  console.log(data.id)
  console.log(data.accessKey)

  const query =
    await "UPDATE ct_public SET ACCESS_KEY=?, SECRET_KEY=? WHERE PUBLIC_ID = ?";

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");

    output = await conn.query(query, [ACCESS_KEY, SECRET_KEY, PUBLIC_ID]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}
async function PostFollowing(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  const query = `
    INSERT INTO ct_following (
      PUBLIC_SEQ, LEADER_SEQ, FOLLOWING_TYPE, COPY_TRADE_TYPE, FIXED_AMOUNT, FIXED_RATIO, STOP_RATIO, TAKE_RATIO, IS_AUTO_TRADING_YN, FOLLOWING_ST
    )
    VALUES (?,?,'FT01',?,?,?,?,?,?,'FS01')
    ON DUPLICATE KEY UPDATE
      FOLLOWING_TYPE = ?,
      COPY_TRADE_TYPE = ?,
      FIXED_AMOUNT = ?,
      FIXED_RATIO = ?,
      STOP_RATIO = ?,
      TAKE_RATIO = ?,
      IS_AUTO_TRADING_YN = ?,
      FOLLOWING_ST = ?
  `;

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");

    output = await conn.query(query, [
      data.publicSeq,
      data.leaderSeq,
      data.tradeType,
      data.fixAmount,
      data.fixRatio,
      data.stopRatio,
      data.takeRatio,
      data.isAutoTrading,
      "FT01",
      data.tradeType,
      data.fixAmount,
      data.fixRatio,
      data.stopRatio,
      data.takeRatio,
      data.isAutoTrading,
      "FS01",
    ]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}

async function DisableFollowing(data) {
  console.log(`DB data : ${JSON.stringify(data)}`);

  const query = await `
    UPDATE ct_following
    SET FOLLOWING_ST = 'FS02'
    WHERE PUBLIC_SEQ = ? AND LEADER_SEQ = ?;
  `;

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");

    output = await conn.query(query, [data.publicSeq, data.leaderSeq]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}

// 신규 알람 등록
async function POST_alarm(data) {
  console.log("new Alarm");
  console.log(`DB data : ${JSON.stringify(data)}`);

  FOLLOWING_SEQ = data.FOLLOWING_SEQ;
  TRADE_TYPE = data.TRADE_TYPE;
  TRADE_SYMBOL = data.TRADE_SYMBOL;
  TRADE_MARKET = data.TRADE_MARKET;
  TRADE_VOLUME = data.TRADE_VOLUME;
  TRADE_PRICE = data.TRADE_PRICE;
  IS_READ_YN = data.IS_READ_YN;
  TRADE_YN = data.TRADE_YN;
  IS_AUTOTRADE_YN = data.IS_AUTOTRADE_YN;
  CONTENTS = data.CONTENTS;
  REG_DT = data.REG_DT;

  const SQLquery =
    await `INSERT INTO copytrade_proto.ct_alarm_history (FOLLOWING_SEQ, TRADE_TYPE, TRADE_SYMBOL, TRADE_MARKET, TRADE_VOLUME, TRADE_PRICE, IS_READ_YN, TRADE_YN, IS_AUTOTRADE_YN, CONTENTS, REG_DT) VALUES (${FOLLOWING_SEQ}, '${TRADE_TYPE}', '${TRADE_SYMBOL}', '${TRADE_MARKET}', ${TRADE_VOLUME}, ${TRADE_PRICE}, '${IS_READ_YN}', '${TRADE_YN}', '${IS_AUTOTRADE_YN}', '${CONTENTS}', '${REG_DT}')`;
  console.log("SQL query", SQLquery);

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");
    console.log(`DB query :  ${SQLquery}`);
    output = await conn.query(`${SQLquery}`);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    console.log(output);
    return;
  }
}

const sql = (module.exports = {
  POST_LT_history: POST_LT_history,
  POST_user: POST_user,
  POST_leader: POST_leader,
  POST_public: POST_public,
  PostFcmToken: PostFcmToken,
  PostKey: PostKey,
  PostFollowing: PostFollowing,
  DisableFollowing: DisableFollowing,
  POST_alarm: POST_alarm,
});

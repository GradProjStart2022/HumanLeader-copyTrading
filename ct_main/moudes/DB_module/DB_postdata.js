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
  // PUBLIC_ST = "OS01"; //DB에 디폴트로 변경
  // 아래 두 col db에 디폴트 들어가도록 변경함 (APP에서 POST 하지 않는 데이터)
  //   REG_DT = data.REG_DT;
  //   MOD_DT = data.MOD_DT;
  //   ACCESS_KEY = data.ACCESS_KEY; // Default null 로 설정
  //   SECRET_KEY = data.SECRET_KEY; // Default null 로 설정

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log(`INSERT INTO ct_public (PUBLIC_ID) VALUES ('${PUBLIC_ID}')`);
    var query = "INSERT INTO ct_public (PUBLIC_ID) VALUES (?)";
    output = await conn.query(query, [userInput]);
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
    await `INSERT INTO ct_leader (LEADER_UID, LEADER_NAME, LEADER_IMAGE, LEADER_CAPACITY, LEADER_PRICE, LEADER_AMOUNT, EXCHANGE_TYPE, ACCESS_KEY, SECRET_KEY, TRADER_ST, REG_DT, MOD_DT) VALUES (${LEADER_UID}, '${LEADER_NAME}', '${LEADER_IMAGE}', '${LEADER_CAPACITY}', '${LEADER_PRICE}', '${LEADER_AMOUNT}','${EXCHANGE_TYPE}', '${ACCESS_KEY}', '${SECRET_KEY}','${TRADER_ST}','${REG_DT}','${MOD_DT}');`;
  console.log(SQLquery);

  let conn, output;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto");
    console.log("con success");
    console.log(
      `DB query :  INSERT INTO ct_leader (LEADER_UID, LEADER_NAME, LEADER_IMAGE, LEADER_CAPACITY, LEADER_PRICE, LEADER_AMOUNT, EXCHANGE_TYPE, ACCESS_KEY, SECRET_KEY, TRADER_ST, REG_DT, MOD_DT) VALUES ('${LEADER_UID}', '${LEADER_NAME}', '${LEADER_IMAGE}', '${LEADER_CAPACITY}', '${LEADER_PRICE}', '${LEADER_AMOUNT}', '${EXCHANGE_TYPE}', '${ACCESS_KEY}', '${SECRET_KEY}','${TRADER_ST}','${REG_DT}','${MOD_DT}');`
    );
    output = await conn.query(
      `INSERT INTO ct_leader (LEADER_UID, LEADER_NAME, LEADER_IMAGE, LEADER_CAPACITY, LEADER_PRICE, LEADER_AMOUNT, EXCHANGE_TYPE, ACCESS_KEY, SECRET_KEY, TRADER_ST, REG_DT, MOD_DT) VALUES ('${LEADER_UID}', '${LEADER_NAME}', '${LEADER_IMAGE}', '${LEADER_CAPACITY}', '${LEADER_PRICE}', '${LEADER_AMOUNT}','${EXCHANGE_TYPE}', '${ACCESS_KEY}', '${SECRET_KEY}','${TRADER_ST}','${REG_DT}','${MOD_DT}');`
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
      `DB query :  "UPDATE ct_public SET (TOKEN=${TOKEN}) where id = (${PUBLIC_ID})`
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

module.exports = {
  POST_LT_history: POST_LT_history,
  POST_user: POST_user,
  POST_leader: POST_leader,
  PostFcmToken: PostFcmToken,
};

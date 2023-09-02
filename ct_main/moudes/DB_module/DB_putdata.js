const mariadb = require("mariadb");
const vals = require("./DB_info.js");

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
    host: vals.DBhost,
    port: vals.DBport,
    user: vals.DBuser,
    password: vals.DBpass,
  });

// 유저 정보 수정
async function PUT_public(data) {
    console.log('pulic data update call')
    console.log(`DB data : ${JSON.stringify(data)}`);
  
    // 변겨할 유저 SEQ
    const PUBLIC_SEQ = data.PUBLIC_SEQ

    // 변경될 정보
    const PUBLIC_ID = data.PUBLIC_ID
    const PUBLIC_ST = data.PUBLIC_ST
    const REG_DT = data.REG_DT
    const MOD_DT = data.MOD_DT
    const ACCESS_KEY = data.ACCESS_KEY
    const SECRET_KEY = data.SECRET_KEY
    const TOKEN = data.TOKEN
  
    // 실행될 SQL 쿼리
    const SQLquery =
      await `UPDATE ct_public SET PUBLIC_ID = "${PUBLIC_ID}", PUBLIC_ST = "${PUBLIC_ST}", REG_DT = "${REG_DT}", MOD_DT = "${MOD_DT}", ACCESS_KEY =  "${ACCESS_KEY}",SECRET_KEY = "${SECRET_KEY}", TOKEN = "${TOKEN}" WHERE PUBLIC_SEQ = ${PUBLIC_SEQ};`;
    console.log(SQLquery);
    let conn, output;
    try {
      conn = await pool.getConnection();
      await conn.query("USE copytrade_proto");
      console.log("con success");
      console.log(
        `DB query : ${SQLquery}`
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


// 알람 seq를 받아 해당알람을 읽음으로 표시
async function PUT_alarm_isread(alarm_seq) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE copytrade_proto;");
    rows = await conn.query(`
    UPDATE ct_alarm_history
    SET IS_READ_YN = 'Y'
    WHERE ALARM_SEQ = ${alarm_seq};
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

module.exports = {
  PUT_public: PUT_public,
  PUT_alarm_isread : PUT_alarm_isread,
  };
  
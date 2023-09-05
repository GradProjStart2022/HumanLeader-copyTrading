const mariadb = require("mariadb");
const vals = require("./DB_info.js");

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
  host: vals.DBhost,
  port: vals.DBport,
  user: vals.DBuser,
  password: vals.DBpass,
});

// 유저 정보 삭제
async function DEL_public(data) {
    console.log('pulic data delete call')
    console.log(`DB data : ${JSON.stringify(data)}`);
  
    // 삭제할 유저 SEQ
    const PUBLIC_SEQ = data.PUBLIC_SEQ

  
    // 실행될 SQL 쿼리
    const SQLquery =
      await `DELETE FROM ct_public WHERE PUBLIC_SEQ = ${PUBLIC_SEQ};`;
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

  // 유저 토큰 삭제
async function DEL_token(id) {
  console.log('pulic data delete call')
  console.log(`DB data : ${JSON.stringify(id)}`);

  // 실행될 SQL 쿼리
  const SQLquery =
    await `UPDATE ct_public
    SET TOKEN = NULL
    WHERE PUBLIC_SEQ = ${PUBLIC_SEQ};`;
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

module.exports = {
  DEL_public: DEL_public,
  DEL_token: DEL_token,
};

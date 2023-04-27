import { createPool, releaseConnection } from "../model/pool";
require("dotenv").config();

async function getLeaders() {
  const sql = `
    SELECT 
        LEADER_SEQ,
        ACCESS_KEY,
        SECRET_KEY

    FROM 
        ct_leader
    WHERE
        TRADER_ST = "RS01";
    `;

  const pool = createPool();

  let leaders;
  try {
    const conn = await pool.getConnection();
    leaders = await conn.query(sql);
    conn.release();
  } catch (err) {
    console.log(err);
  } finally {
    console.log("DB에서 리더트레이더 정보 불러오기 완료");
    delete leaders.meta;
  }

  return leaders;
}

module.exports = getLeaders;

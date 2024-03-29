import { createPool, releaseConnection } from "../../model/pool";

async function getFollowers() {
  const sql = `
    SELECT 
      LEADER_SEQ, p.PUBLIC_SEQ, ACCESS_KEY, SECRET_KEY, COPY_TRADE_TYPE, FIXED_AMOUNT, FIXED_RATIO, IS_AUTO_TRADING_YN
    FROM 
      ct_public p INNER JOIN ct_following f
    ON
      p.PUBLIC_SEQ = f.PUBLIC_SEQ
    WHERE
      p.PUBLIC_ST = "OS01" AND p.PUBLIC_SEQ = f.PUBLIC_SEQ
    ORDER BY 
      LEADER_SEQ;
    `;

  const pool = createPool();

  const conn = await pool.getConnection(async (conn) => conn);
  let followers;
  try {
    followers = await conn.query(sql);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
    delete followers.meta;
    console.log("DB에서 구독정보 불러오기 완료");
  }
  return followers;
}

module.exports = getFollowers;

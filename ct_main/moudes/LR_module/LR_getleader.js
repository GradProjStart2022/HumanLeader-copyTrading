var db_getdata = require("../DB_module/DB_getdata");
var tr_getleadrhis = require("../TR_module/TR_gettrade");

// 모든 리더 목록 조회
async function get_leader_all() {
  console.log("LR req get");

  // DB 모듈을 이용해 전체 리더데이터 불러오기

  var DB_data = await db_getdata.Get_all_leader();

  return DB_data;
}

async function get_leader_byID(seq) {
  console.log("LR req get");

  // DB 모듈을 이용해 전체 리더데이터 불러오기

  var DB_data = await db_getdata.Get_leader_by_id(seq);

  return DB_data;
}

// ID를 통해 해당 리더 검색
async function get_leaderhis_byID(seq) {
  console.log("LR req get");

  // DB 모듈을 이용해 전체 리더데이터 불러오기

  var leader_his = await tr_getleadrhis.TR_getleaderhis_byID(seq);

  return leader_his;
}

async function get_leader_by_publicseq(PUBLIC_SEQ) {
  //SU 모듈을 통해 전달된 데이터 확인

  const sub_data = await db_getdata.Get_leader_by_publicseq(PUBLIC_SEQ);

  return sub_data;
}
// 리더 실현수익, 수익률
async function getLeaderProfit(seq) {
  const rows = await db_getdata.Get_leader_history_byID(seq);
  try {
    // 코인 종류별로 수익을 저장할 객체
    const coinProfits = {};

    for (const row of rows) {
      const coin = row.TRADE_MARKET;

      if (!coinProfits[coin]) {
        coinProfits[coin] = {
          totalProfit: 0,
          totalInvestment: 0,
        };
      }

      if (row.TRADE_TYPE === "TT01") {
        // 매수일 경우
        coinProfits[coin].totalInvestment += row.TRADE_PRICE * row.TRADE_VOLUME;
      } else if (row.TRADE_TYPE === "TT02") {
        // 매도일 경우
        const profit = (row.TRADE_PRICE - row.AVG_BUY_PRICE) * row.TRADE_VOLUME;
        coinProfits[coin].totalProfit += profit;
        coinProfits[coin].totalInvestment -=
          row.AVG_BUY_PRICE * row.TRADE_VOLUME;
      }
    }

    let totalProfit = 0;
    let totalInvestment = 0;

    // 모든 코인 종류의 수익을 합산
    for (const coin in coinProfits) {
      totalProfit += coinProfits[coin].totalProfit;
      totalInvestment += coinProfits[coin].totalInvestment;
    }

    const realizedProfitPercentage = (totalProfit / totalInvestment) * 100;
    return {
      profit: totalProfit,
      rate: realizedProfitPercentage.toFixed(2),
    };
  } catch (error) {
    throw error;
  } finally {
  }
}

module.exports = {
  get_leader_all: get_leader_all,
  get_leaderhis_byID: get_leaderhis_byID,
  get_leader_byID: get_leader_byID,
  get_leader_by_publicseq: get_leader_by_publicseq,
  get_leader_by_publicseq: get_leader_by_publicseq,
  getLeaderProfit: getLeaderProfit,
};

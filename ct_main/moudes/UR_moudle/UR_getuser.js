var db_getdata = require("../DB_module/DB_getdata");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// 모든 유저 목록 조회
async function get_user_all() {
  // DB 모듈을 이용해 전체 유저데이터 불러오기
  var DB_data = await db_getdata.Get_all_user();

  return DB_data;
}

async function get_user_by_id(id) {
  // DB 모듈을 이용해 전체 유저데이터 불러오기
  var DB_data = await db_getdata.Get_user_by_id(id);

  return DB_data;
}
async function get_userinfo_by_id(id) {
  // DB 모듈을 이용해 전체 유저데이터 불러오기
  var DB_data = await db_getdata.Get_userinfo_by_id(id);

  return DB_data;
}

// 유저 수익률 조회
async function getUserPortfolioValue(id) {
  // JWT 생성 함수
  const keys = await db_getdata.GetUserKey(id);

  console.log(keys[0]);
  function generateJwtToken(ACCESS_KEY, SECRET_KEY) {
    const payload = {
      access_key: ACCESS_KEY,
      nonce: Date.now().toString(),
    };
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
  }
  
  // 계좌 정보 조회
  async function getAccountInfo(ACCESS_KEY, SECRET_KEY) {
    const url = "https://api.upbit.com/v1/accounts";
  
    try {
      const token = generateJwtToken(ACCESS_KEY, SECRET_KEY);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching account info:", error.message);
      return null;
    }
  }
  
  // 현재 시세 조회
  async function getCurrentPrice(market) {
    const url = `https://api.upbit.com/v1/ticker?markets=${market}`;
  
    try {
      const response = await axios.get(url);
      return response.data[0].trade_price;
    } catch (error) {
      console.error("Error fetching current price:", error.message);
      return null;
    }
  }
  
  // 총매수액, 총평가액, 평가손익 계산
  async function calculatePortfolioValue(ACCESS_KEY, SECRET_KEY) {
    const accountInfo = await getAccountInfo(ACCESS_KEY, SECRET_KEY);
  
    if (!accountInfo) {
      console.log("Failed to fetch account info.");
      return;
    }
  
    let totalInvestment = 0;
    let totalCurrentValue = 0;
  
    for (const balance of accountInfo) {
      const currency = balance.currency;
      const avgBuyPrice = parseFloat(balance.avg_buy_price);
      const currentPrice = await getCurrentPrice(`KRW-${currency}`);
  
      if (currentPrice) {
        const balanceValue = avgBuyPrice * parseFloat(balance.balance);
        const currentValue = currentPrice * parseFloat(balance.balance);
        totalInvestment += balanceValue;
        totalCurrentValue += currentValue;
      }
    }
  
    const unrealizedProfitLoss = totalCurrentValue - totalInvestment;
    const unrealizedProfitRate = (unrealizedProfitLoss / totalInvestment) * 100;
  
    return {
      profit: unrealizedProfitLoss.toFixed(2),
      rate: unrealizedProfitRate.toFixed(2),
    };
  }

  const portfolioValue = await calculatePortfolioValue(
    keys[0].ACCESS_KEY,
    keys[0].SECRET_KEY
  );

  return portfolioValue;
}

module.exports = {
  get_user_all: get_user_all,
  get_user_by_id: get_user_by_id,
  get_userinfo_by_id: get_userinfo_by_id,
  getUserPortfolioValue: getUserPortfolioValue,
};

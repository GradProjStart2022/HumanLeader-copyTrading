const axios = require("axios");
const jwt = require("jsonwebtoken");
// Upbit API 액세스 토큰과 시크릿 키

const ACCESS_KEY = "6ycvzM61YLXZinx6ERLIZ2xca2ZBoNgMBEgQK4oB";
const SECRET_KEY = "UEIfmOTB8fybdg6JKSMTYote529CZspDRy3MlEA7";

// JWT 생성 함수
function generateJwtToken() {
  const payload = {
    access_key: ACCESS_KEY,
    nonce: Date.now().toString(),
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

// 계좌 정보 조회
async function getAccountInfo() {
  const url = "https://api.upbit.com/v1/accounts";

  try {
    const token = generateJwtToken();
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
async function calculatePortfolioValue() {
  const accountInfo = await getAccountInfo();

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

  console.log(`평가손익: ${unrealizedProfitLoss.toFixed(2)} KRW`);
  console.log(`평가손익률: ${unrealizedProfitRate.toFixed(2)}%`);
}

calculatePortfolioValue();

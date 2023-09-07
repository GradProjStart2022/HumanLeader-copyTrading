const axios = require("axios");

// Upbit API 엔드포인트와 API 키 설정
const BASE_URL = "https://api.upbit.com/v1";
const ACCESS_KEY = "0IY5RsMIveGbzakMioCiVWCYSh7SW79b1kk67pyK"; // 자신의 Upbit API Access Key로 대체
const SECRET_KEY = "oxHXzBQQmLcbWrSX43wObyxTOdxv4fXaWi78n05x"; // 자신의 Upbit API Secret Key로 대체

// Upbit API를 호출하는 함수
async function callUpbitAPI(endpoint, params = {}) {
  const config = {
    headers: {
      Authorization: `Bearer ${ACCESS_KEY}`,
    },
    params,
  };

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Upbit API: ${error.message}`);
    throw error;
  }
}

// 최근 90일간의 거래 내역 가져오기
async function getRecentTrades(market) {
  const params = {
    market,
    count: 90, // 최근 90일 데이터를 가져옵니다.
  };

  const trades = await callUpbitAPI("/trades/ticks", params);
  return trades.reverse(); // 오래된 데이터부터 최신 데이터로 정렬
}

// 일간 수익률을 계산하는 함수
function calculateDailyReturns(trades) {
  const dailyReturns = [];

  for (let i = 1; i < trades.length; i++) {
    const prevTrade = trades[i - 1];
    const currentTrade = trades[i];

    const dailyReturn = (
      ((currentTrade.trade_price - prevTrade.trade_price) /
        prevTrade.trade_price) *
      100
    ).toFixed(2); // 소수점 둘째 자리까지 고정
    dailyReturns.push(parseFloat(dailyReturn)); // 소수로 변환하여 배열에 추가
  }

  return dailyReturns;
}

// 최근 90일간의 날마다 수익률을 가져오는 함수
async function get90DayDailyReturns(market) {
  try {
    const trades = await getRecentTrades(market);
    const dailyReturns = calculateDailyReturns(trades);
    return dailyReturns;
  } catch (error) {
    return null;
  }
}

// 특정 마켓에 대한 최근 90일간의 날마다 수익률을 가져오기
const market = "KRW-BTC"; // 원하는 마켓을 지정하세요.
get90DayDailyReturns(market)
  .then((dailyReturns) => {
    if (dailyReturns) {
      console.log("날마다의 수익률:", dailyReturns);
    } else {
      console.log("데이터를 가져오는 중에 오류가 발생했습니다.");
    }
  })
  .catch((error) => {
    console.error("오류 발생:", error.message);
  });

// 주어진 JSON 배열
const leaderData = [
  {
    LEADER_SEQ: 1,
    LEADER_UID: "testleader1",
    // ... (다른 필드들)
  },
  {
    LEADER_SEQ: 2,
    LEADER_UID: "testleader2",
    // ... (다른 필드들)
  },
];

async function getLeaderProfit(seq) {
  return seq * 2;
}

// 각 JSON 객체에 대해 LEADER_SEQ를 사용하여 LR_leaderget.getLeaderProfit(seq) 호출 후 결과 추가
async function enrichDataWithProfit(data) {
  var array = [];
  for (let i = 0; i < data.length; i++) {
    const seq = data[i].LEADER_SEQ;

    try {
      // getLeaderProfit(seq) 함수를 호출하여 수익 정보 가져오기
      const profit = await getLeaderProfit(seq);

      // 수익 정보를 JSON 객체에 추가
      data[i].LEADER_PROFIT = profit;

      // 이제 data[i] 객체에 LEADER_PROFIT 필드가 추가되었습니다.
      array.push(data[i]);
    } catch (error) {
      console.error(
        `Error fetching profit for LEADER_SEQ ${seq}: ${error.message}`
      );
    }
  }
  return array;
}

// 최상위 레벨에서 실행
(async () => {
  const data = await enrichDataWithProfit(leaderData);
  console.log(data);
})();

var express = require("express");
var router = express.Router();
var LR_leaderget = require("../../LR_module/LR_getleader");
var LR_leaderPost = require("../../LR_module/LR_postleader");

router.get("/", async function (req, res, next) {
  console.log("this is app router");
  res.end("ok - app router");
});

// 모든 리더 목록 요청
router.get("/all", async function (req, res, next) {
  console.log("app - get all leader request");
  // LR 모듈에게 모든 리더 목록 요청
  var LR_data = await LR_leaderget.get_leader_all();
  //console.log(`LR data : ${JSON.stringify(LR_data)}`);

  
  // 각 JSON 객체에 대해 LEADER_SEQ를 사용하여 LR_leaderget.getLeaderProfit(seq) 호출 후 결과 추가
async function enrichDataWithProfit(data) {
  var array = [];
  for (let i = 0; i < data.length; i++) {
    const seq = data[i].LEADER_SEQ;

    try {
      // getLeaderProfit(seq) 함수를 호출하여 수익 정보 가져오기
      const profit = await LR_leaderget.getLeaderProfit(seq);

      // 수익 정보를 JSON 객체에 추가
      data[i].profit = profit.profit;
      data[i].rate = profit.rate;
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
  const data = await enrichDataWithProfit(LR_data);
  res.json(data);
})();
});

router.get("/:seq", async function (req, res, next) {
  var seq = await req.params.seq;
  // LR 모듈에게 리더 요청
  var LR_data = await LR_leaderget.get_leader_byID(seq);
  //console.log(`LR data : ${JSON.stringify(LR_data)}`);

  res.json(LR_data);
});

router.get("/leaders/:publicseq", async function (req, res, next) {
  var seq = await req.params.publicseq;
  // LR 모듈에게 리더 요청
  var LR_data = await LR_leaderget.get_leader_by_publicseq(seq);
  //console.log(`LR data : ${JSON.stringify(LR_data)}`);
  var profit = await LR_leaderget.getLeaderProfit(LR_data[0].LEADER_SEQ)
  var data = {
    ...LR_data[0],
    ...profit
  }
  data=[data]
  res.json(data);
});

// 리더 수익률 계산
router.get("/profit/:publicseq", async function (req, res, next) {
  var seq = await req.params.publicseq;
  // LR 모듈에게 리더 수익률 요청
  var LR_data = await LR_leaderget.getLeaderProfit(seq);
  //console.log(`LR data : ${JSON.stringify(LR_data)}`);

  res.json(LR_data);
});

// 특정 리더의 모든 거래기록 요청
router.post("/history", async function (req, res, next) {
  var body = await req.body;
  const seq = body.seq;
  var leader_his = await LR_leaderget.get_leaderhis_byID(seq);
  console.log(`router : ${JSON.stringify(leader_his)}`);
  res.json(leader_his);
});

// 리더생성 이벤트 라우터
// xxx:3000/leader 에서 post로 회원가입시 작동
router.post("/new", async function (req, res, next) {
  data = req.body;
  console.log(req.body);
  res.statusCode = 200;
  res.end("ok");

  // 받은 데이터 확인
  console.log(`EV data: ${JSON.stringify(data)}`);

  // 받은 데이터를 LR모듈의 함수에 전달
  LR_leaderPost.leader_new(data);
});

module.exports = router;

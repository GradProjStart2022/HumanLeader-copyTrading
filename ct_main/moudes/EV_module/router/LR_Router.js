var express = require('express');
var router = express.Router();
var LR_leaderget = require('../../LR_module/LR_getleader');
var LR_leaderPost = require('../../LR_module/LR_postleader');


router.get('/',async function(req, res, next){

    console.log("this is app router");
    res.end('ok - app router');

});


// 모든 리더 목록 요청
router.get('/all',async function(req, res, next){
    console.log("app - get all leader request");
    // LR 모듈에게 모든 리더 목록 요청
    var LR_data = await LR_leaderget.get_leader_all();
    //console.log(`LR data : ${JSON.stringify(LR_data)}`);

    res.json(LR_data);

});


// 특정 리더의 모든 거래기록 요청
router.post('/history', async function(req, res, next) {
    
    var body = await req.body;
    const seq = body.seq;
    var leader_his = await LR_leaderget.get_leaderhis_byID(seq);
    console.log(`router : ${JSON.stringify(leader_his)}`);
    res.json(leader_his);

  });



// 리더생성 이벤트 라우터
// xxx:3000/leader 에서 post로 회원가입시 작동
router.post('/new', async function(req, res, next) {
    
    data = req.body;
    console.log(req.body)
    res.statusCode = 200;
    res.end('ok');

    // 받은 데이터 확인
    console.log(`EV data: ${JSON.stringify(data)}`);
    
    // 받은 데이터를 LR모듈의 함수에 전달
    LR_leaderPost.leader_new(data);

});


module.exports = router;
var express = require('express');
var router = express.Router();
var LR_leaderget = require('../../LR_module/LR_leaderget');


router.get('/',async function(req, res, next){

    console.log("this is app router");
    res.end('ok - app router');

});


// 앱에서 모든 리더 목록 요청
router.get('/leader/all',async function(req, res, next){
    console.log("app - get all leader request");
    // LR 모듈에게 모든 리더 목록 요청
    var LR_data = await LR_leaderget.get_leader_all();
    console.log(`LR data : ${JSON.stringify(LR_data)}`);

    res.end('ok');

});

module.exports = router;
var express = require('express');
var ur_userpost = require('../../UR_moudle/UR_userpost')
var router = express.Router();

// 회원가입 이벤트 라우터
// xxx:3000/user에서 post로 회원가입시 작동
// 
router.post('/new', async function(req, res, next) {
    
    data = req.body;
    console.log(req.body)
    res.statusCode = 200;
    res.end('ok');

    // 받은 데이터 확인
    console.log(`EV data: ${JSON.stringify(data)}`);
    
    // 받은 데이터를 UR모듈의 함수에 전달
    ur_userpost.user_signup(data);



});


module.exports = router;
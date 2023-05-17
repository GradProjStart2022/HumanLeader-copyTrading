var express = require('express');
var ur_userpost = require('../../UR_moudle/UR_postuser');
var UR_userget = require('../../UR_moudle/UR_getuser')
var router = express.Router();



// 모든 유저 목록 조회
router.get('/all',async function(req, res, next){
    console.log("app - get all user list request");
    // UR 모듈을 통해 데이터 조회 요청
    var UR_data = await UR_userget.get_user_all();
    //console.log(`UR_data : ${JSON.stringify(UR_data)}`);
    res.json(UR_data);
    

});



// 회원가입 이벤트 라우터
// xxx:3000/user에서 post로 회원가입시 작동
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
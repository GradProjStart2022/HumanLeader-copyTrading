var express = require('express');
var router = express.Router();
var SU_getsub = require('../../SU_module/SU_getsub')


// 모든 구독 목록 요청
router.get('/all',async function(req, res, next){
    console.log("app - get all leader request");
    var SU_data = await SU_getsub.get_sub_all()
    //console.log(`SU_data : ${JSON.stringify(SU_data)}`);
    
    res.json(SU_data);

});


module.exports = router;
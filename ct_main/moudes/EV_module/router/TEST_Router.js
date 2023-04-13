const { json } = require('express');
var express = require('express');
var db_talbe_view = require('../../DB_module/DB_tableview');
var router = express.Router();


// 데이터베이스의 모든 테이블을 보여줌
router.get('/show_tables', function(req, res, next) {

    db_talbe_view.show_tables()
    .then((rows) => {
      console.log(typeof rows);
      res.json(rows);
      return;
    })
    .catch((errMsg) => {
      console.log(errMsg);
      return;
    });

  
});

// ct_cmm_code 테이블의 모든 데이터를 보여줌
router.get('/show_cmmcode', function(req, res, next) {

    db_talbe_view.showtable_cmmcode()
    .then((rows) => {
      console.log(typeof rows);
      
      res.json(rows);
      return;
    })
    .catch((errMsg) => {
      console.log(errMsg);
      return;
    });

  
});

module.exports = router;

var express = require('express');
var db_connect = require('../../DB_connect/test_db_connect');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    db_connect.Get_LT_info()
    .then((rows) => {
      console.log(rows);
      // console.log(typeof rows);    => object
      console.log(JSON.stringify(rows));
      res.json(rows);
      return;
    })
    .catch((errMsg) => {
      console.log(errMsg);
      return;
    });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var DB_getdata = require('../../DB_module/DB_getdata')

router.get("/", async function (req, res, next) {
    console.log("this is app router");
    res.end("ok - (get)app router");
  });

router.get("/contents", async function (req, res, next) {
    console.log("this is app router");
    var data = await DB_getdata.Get_apptext();
    console.log(JSON.stringify(data))
    res.json(data)
  });


router.post("/", async function (req, res, next) {
    console.log("this is app router");
    res.end("ok - (post)app router");
  });


router.post("/new", async function (req, res, next) {
    console.log("app/new");

    const data = {
        FOLLOWING_SEQ : req.body.FOLLOWING_SEQ,
        TRADE_TYPE : req.body.TRADE_TYPE,
        TRADE_SYMBOL : req.body.TRADE_SYMBOL,
        TRADE_MARKET : req.body.TRADE_MARKET,
        TRADE_VOLUME : req.body.TRADE_VOLUME,
        TRADE_PRICE :  req.body.TRADE_PRICE,
        IS_READ_YN : req.body.IS_READ_YN,
        TRADE_YN : req.body.TRADE_YN,
        IS_AUTOTRADE_YN : req.body.IS_AUTOTRADE_YN,
        CONTENTS : req.body.CONTENTS,
        REG_DT : req.body.REG_DT
    }

    DB_postdata.POST_alarm(data);
    res.end("ok - (post) new alarm ");
  });



module.exports = router;
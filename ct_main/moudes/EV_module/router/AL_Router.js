var express = require("express");
var router = express.Router();
var DB_postdata = require('../../DB_module/DB_postdata');
const DB_getdata = require("../../DB_module/DB_getdata");

var AL_getdata = require('../../AL_module/AL_getdata');
var AL_postdata = require('../../AL_module/AL_postdata');


router.get("/", async function (req, res, next) {
    console.log("this is alarm router");
    res.end("ok - (get)alarm router");
  });


router.post("/", async function (req, res, next) {
    console.log("this is alarm router");
    res.end("ok - (post)alarm router");
  });


router.post("/new", async function (req, res, next) {
    console.log("alarm/new");

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


router.get("/all", async (req,res,next) => {
  console.log("{get} /alarm/all");
  const data = await AL_getdata.get_allalarm();
  // console.log('Router :',data);
  
  res.json(data);
})

router.post("/one", async (req,res,next) => {
  console.log("{get} /alarm/one");

  const data = await AL_getdata.get_allalarm();
  const alarm_seq = req.body.ALARM_SEQ
  console.log(alarm_seq)
  const filteredData = data.filter(item => item.ALARM_SEQ == `${alarm_seq}`);
  
  console.log('Router :',filteredData);
  
  res.json(filteredData);
})

router.post("/public", async (req,res,next) => {
  console.log("{get} /alarm/public");

  const data = await DB_getdata.Get_alarm_bypublic(req.body.PUBLIC_SEQ);
  
  console.log('Router :',data);

  res.json(data);
})

router.post("/isread", async (req,res,next) => {
  console.log("{post} /alarm/isread");
  AL_postdata.alarm_isread(req.body.ALARM_SEQ)
  res.end('ok')
  
})




module.exports = router;
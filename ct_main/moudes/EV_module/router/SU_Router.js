var express = require("express");
var router = express.Router();
var SU_getsub = require("../../SU_module/SU_getsub");
var SU_postsub = require("../../SU_module/SU_postsub");

// 모든 구독 목록 요청
router.get("/all", async function (req, res, next) {
  console.log("app - get all leader request");
  var SU_data = await SU_getsub.get_sub_all();
  //console.log(`SU_data : ${JSON.stringify(SU_data)}`);

  res.json(SU_data);
});
// 새 구독
router.post("/new", async function (req, res, next) {
  console.log(req.body);
  data = req.body;

  var SU_data = await SU_postsub.post_following(data);
  //console.log(`SU_data : ${JSON.stringify(SU_data)}`);

  res.json({ message: "success" });
});

// 구독 해제
router.post("/disable", async function (req, res, next) {
  console.log("app - disable following");
  data = req.body;
  console.log(req.body);

  var SU_data = await SU_postsub.disable_following(data);
  //console.log(`SU_data : ${JSON.stringify(SU_data)}`);

  res.json({ message: "success" });
});

// 구독 여부 확인
router.get("/:leaderSeq/:publicSeq", async function (req, res, next) {
  var SU_data = await SU_getsub.isSubed(
    req.params.leaderSeq,
    req.params.publicSeq
  );
  //console.log(`SU_data : ${JSON.stringify(SU_data)}`);
  if (SU_data[0].result === 1) {
    res.json({ SUBSCRIBED: "Y" });
  } else {
    res.json({ SUBSCRIBED: "N" });
  }
});

module.exports = router;

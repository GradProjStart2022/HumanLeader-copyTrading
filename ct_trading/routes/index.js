import express from "express";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/v1");
});

module.exports = router;

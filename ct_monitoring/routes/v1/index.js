import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import mornitoringRouter from "../monitoring";

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/v1/docs");
});

router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(path.join(__dirname, "./swagger/swagger.yaml")))
);

router.use("/mornitoring", mornitoringRouter);

module.exports = router;

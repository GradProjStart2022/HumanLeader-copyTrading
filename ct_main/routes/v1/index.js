var express  = require("express")
var  swaggerUi = require("swagger-ui-express")
var YAML = require("yamljs")
var path = require("path")



const router = express.Router();

router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(path.join(__dirname, "./swagger/swagger.yaml")))
);

module.exports = router;

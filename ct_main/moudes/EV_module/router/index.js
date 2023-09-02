var express = require('express');
const DB_getdata = require('../../DB_module/DB_getdata');
var router = express.Router();
var gedata = require('../../DB_module/DB_getdata')

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log('server is running')
  res.render('index', { title: 'Express' });
});

router.get('/ttt', async (req,res,next) => {
  const data = await DB_getdata.Get_following_isauto('205');
  res.end(data)
})

module.exports = router;

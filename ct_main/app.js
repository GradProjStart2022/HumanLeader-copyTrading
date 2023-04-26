var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

let corsOptions = {
  origin: '*',      // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}




// swaggrt Router
// 디렉토리 이름 대소문자 안맞으면 서버에서 실행 안됨...
var v1swaggerRouter = require('./moudes/EV_module/router/v1/index');
var indexRouter = require('./moudes/EV_module/router/index');
var TEST_Router = require('./moudes/EV_module/router/TEST_Router');
var UR_Router = require('./moudes/EV_module/router/UR_Router');
var LR_Router = require('./moudes/EV_module/router/LR_Router');
var TR_Router = require('./moudes/EV_module/router/TR_Router');
var SU_Router = require('./moudes/EV_module/router/SU_Router');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

// index
app.use('/', indexRouter);

// swagger 
app.use("/v1",v1swaggerRouter);

// trade
app.use('/trade',TR_Router);

// test 
app.use('/test',TEST_Router);

// USER 
app.use('/user',UR_Router);

// leader 
app.use('/leader',LR_Router);

//subscribe
app.use('/sub',SU_Router);


module.exports = app;

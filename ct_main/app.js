var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// swaggrt Router
var v1swaggerRouter = require('./moudes/EV_module/router/v1/index')

// index Router
var indexRouter = require('./moudes/EV_module/router/index');

// Test Router
var TEST_Router = require('./moudes/EV_module/Router/TEST_Router')

/**  신규 이벤트   */

// 회원가입
var UR_Router = require('./moudes/EV_module/Router/UR_Router');

// APP 라우터
var LR_Router = require('./moudes/EV_module/Router/LR_Router')


// Monitor server Router
var trade_Router = require('./moudes/EV_module/router/TR_Router')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// index
app.use('/', indexRouter);

// swagger 
app.use("/v1",v1swaggerRouter);


// Monitor server apis
app.use('/trade',trade_Router);

// test 
app.use('/test',TEST_Router);

// USER event
app.use('/user',UR_Router);

// APP event 
app.use('/leader',LR_Router);

module.exports = app;

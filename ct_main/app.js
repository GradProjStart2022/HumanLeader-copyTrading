var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// swaggrt Router
var v1swaggerRouter = require('./moudes/EV_module/router/v1/index');
var indexRouter = require('./moudes/EV_module/router/index');
var TEST_Router = require('./moudes/EV_module/Router/TEST_Router');
var UR_Router = require('./moudes/EV_module/Router/UR_Router');
var LR_Router = require('./moudes/EV_module/Router/LR_Router');
var trade_Router = require('./moudes/EV_module/router/TR_Router');


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

// trade
app.use('/trade',trade_Router);

// test 
app.use('/test',TEST_Router);

// USER 
app.use('/user',UR_Router);

// leader 
app.use('/leader',LR_Router);


module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// swaggrt Router
var v1swaggerRouter = require('./moudes/EV_module/router/v1/index')

// index Router
var indexRouter = require('./moudes/EV_module/router/index');

// Test Router
var TEST_Router = require('./moudes/EV_module/router/DB_test')

// Monitor server Router
var M_newtrade = require('./moudes/EV_module/router/newtrade')


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
app.use('/api/monitor/newtrade',M_newtrade);

app.use('/dbtest',TEST_Router);




module.exports = app;

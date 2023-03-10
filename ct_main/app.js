var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// swaggrt Router
var v1swaggerRouter = require('./routes/v1/index')

// index Router
var indexRouter = require('./routes/index');

// Test Router
var LT_historyRouter = require('./routes/Test/LT_history');
var LT_infoRouter = require('./routes/Test/LT_info')

// Monitor server Router
var M_newtrade = require('./routes/Monitor/M_newtrade')


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

// test apis
app.use('/api/test/LT_history', LT_historyRouter);
app.use('/api/test/LT_info', LT_infoRouter);

// Monitor server apis
app.use('/api/monitor/newtrade',M_newtrade);




module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var LT_historyRouter = require('./routes/LT_history');
var LT_infoRouter = require('./routes/LT_info')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/LT_history', LT_historyRouter);
app.use('/api/LT_info', LT_infoRouter);

module.exports = app;


// git edit test
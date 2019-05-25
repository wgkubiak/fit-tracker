var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI')
var protegesRouter = require('./routes/proteges')
var measuresRouter = require('./routes/measures')
var dailyRouter = require('./routes/daily')
var mealsRouter = require('./routes/meals')
var exerciseRouter = require('./routes/exercises')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Our requests

app.use('/testAPI', testAPIRouter)

app.use('/proteges', protegesRouter)
app.use('/proteges/:id', protegesRouter)
app.put('/proteges/:id', protegesRouter)
app.delete('/proteges/:id', protegesRouter)

app.use('/measures', measuresRouter)
app.use('/measures/:id', measuresRouter)
app.use('/measures/last/:id', measuresRouter)

app.use('/daily', dailyRouter)
app.use('/daily/:id', dailyRouter)

app.use('/meals', mealsRouter)

app.use('/exercises', exerciseRouter)
app.use('/exercises/:id', exerciseRouter)
// End of our requests

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

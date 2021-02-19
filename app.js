var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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




const fs = require('fs');
const crawler = require('./currencyCrawler')
setInterval(() => {
  
  var now = new Date();
  now = 
  reformat(String(now.getMonth()+1))
  +reformat(now.getDate())
  +"_"
  +reformat(now.getHours())
  +reformat(now.getMinutes())
  +reformat(now.getSeconds());

  var data = fs.readFileSync('./info/countries.txt','utf8');
  var countries = data.split('\r\n')

  console.log(now)
  fs.writeFileSync('./info/recent.txt', now , function(err) {
    if (err === null) { 
        console.log('success'); } 
    else { 
        console.log('fail'); 
    } 
  });

  countries.forEach(element => {
    var params = {
      'loc' : element,
      'now' : now
    }
    crawler.getCurrency(params);
  });
}, 60*1000);

function reformat(num) {
  var str = String(num);
  if (str.length == 1) str = '0' + str;
  return str
}



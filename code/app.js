var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var requireFu = require('require-fu');
var RedisStore = require('connect-redis')(session);
var appConfig = require('./config/service.js');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var app = express();
app.set('trust proxy', 1);

/* -----------------------Logging Confirguration ------------------- */

var logDirectory = __dirname + '/log'

// Check whether log directory exists - if not then create
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    date_format: "YYYY-MM-DD",
    verbose: true
});

if (!appConfig.getProperty("minify")) {
    app.use(logger(':date[web]   :method   :url    :response-time',{stream: accessLogStream}));
}

app.locals.deployVersion    = (new Date).getTime();
app.locals.isProd           = appConfig.getProperty("minify");
app.locals.staticRoot       = appConfig.getProperty("static_root");
app.locals.pagesPath        = '/pages';

var thirtyDay = 30 * 86400000;

app.use(session({
    store: new RedisStore({
      host: appConfig.getProperty('redis_url'),
      port: appConfig.getProperty('redis_port'),
      prefix: 'c-sess',
      ttl: 30*86400
    }),
    cookie: {expires: new Date(Date.now() + thirtyDay)},
    secret: 'cenkrypt',
    resave: false,
    saveUninitialized: true,
    name: 'c-session',
    rolling: true
}));

// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '50mb', parameterLimit: 10000000}));
app.use(bodyParser.urlencoded({
  extended: true, limit: '50mb', parameterLimit: 10000000
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist'), {maxAge: thirtyDay}));
app.use("/dist", express.static(__dirname +'/dist/'));
app.use("/agent", express.static(__dirname +'/dist/'));

requireFu(__dirname + '/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("\n\n\n eq.originalUrl1: " + req.originalUrl);
  console.log("\n\n\n req.url1 : " + req.url + "\n\n\n");
  if(req.url && req.url.indexOf('/api/')>-1 || req.url.indexOf('-min.map') > -1 || req.url.indexOf('js.map') > -1){
    console.log('Unknown api called : '+ req.url);
    res.status(500);
    res.send();
  } else {
    next();
  }
});

app.use(function (err, req, res, next) {
  console.log("\n\n\n eq.originalUrl2: " + req.originalUrl);
  console.log("\n\n\n req.url2 : " + req.url + "\n\n\n");
  console.log("\n\n\n err: " + err + "\n\n\n");
  next();
  return;
    res.status(err.status || 500);
    if(req.url && req.url.indexOf('/api/')){
      res.render("dist/");
      res.send();
    } else {
      res.render("dist/");
    }
});

app.use(function (req, res, next) {
  /*var url_parts = req.url.parse(req.url, true);
  req.session = req.session || {};
  console.log("\n\n\n eq.originalUrl3: " + req.originalUrl);
  console.log("\n\n\n req.url3 : " + req.url + "\n\n\n");

  if (!_.isEmpty(url_parts.query) && url_parts.query.source == "agent_web") {
    req.session.queryParams = {};
    for(var k in url_parts.query) {
      if (k != "source") {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    }
    templatePath = "../../dist/";
    res.render(templatePath);
    return;
  };*/

  //if(req.url.indexOf("/js") < 0 && req.url.indexOf("/css") < 0 && req.url.indexOf("/fonts") < 0 && req.url.indexOf("/img") < 0
  //    && req.url.indexOf("/installapps") < 0) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

module.exports = app;
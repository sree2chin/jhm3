//function to add prefix datetime in console.log function
global.console.log=(function() {
  var orig=console.log;
  return function() {
    try {
      arguments[0] = "["+new Date().toUTCString() +"] "+ arguments[0];
      orig.apply(console, arguments);
    }
    catch(err){
      orig.apply(console, arguments);   
    } 
    finally {
      //nothing
    }
  };
})();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var requireFu = require('require-fu');
var RedisStore = require('connect-redis')(session);
var Redis = require('ioredis');
var appConfig = require('./config/service.js');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var app = express();
const passport = require('passport');
var passportConfig = require('./config/passport');

app.set('trust proxy', 1);
var env = process.env.NODE_ENV || 'dev';
const config = require('./config/config')[env];
passportConfig = passportConfig(passport, config);

//https redirection
/*app.use(function(request, response){
  if(request.protocol==='http'){
    console.log('Called http to https redirection');
    response.redirect("https://" + request.headers.host + request.url);
    return;
  }
});*/

/* -----------------------Logging Confirguration ------------------- */

var logDirectory = __dirname + '/log'

// Check whether log directory exists - if not then create
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
passportConfig.saml();
app.get('/saml/Metadata',
  function(req, res) {
    res.type('application/xml');
    res.status(200).send(passportConfig.samlStrategy.generateServiceProviderMetadata("MIIEFzCCAv+gAwIBAgIUHU+0Gh+9C3MX5cI7bJRPPS1ej3cwDQYJKoZIhvcNAQEFBQAwWDELMAkGA1UEBhMCVVMxEDAOBgNVBAoMB1N1cmVpZnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwXT25lTG9naW4gQWNjb3VudCAxMjYwMzgwHhcNMTgwNDIyMTc0NDMwWhcNMjMwNDIyMTc0NDMwWjBYMQswCQYDVQQGEwJVUzEQMA4GA1UECgwHU3VyZWlmeTEVMBMGA1UECwwMT25lTG9naW4gSWRQMSAwHgYDVQQDDBdPbmVMb2dpbiBBY2NvdW50IDEyNjAzODCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMgeE/hMUTcCo8bKj5aZDxrX55HTCGPP/+UpgvGZFhK2F1VVy2h8JCOxx5IIsUsVHG0OCAbBhnsEvtvYRp8aGM0n9GTBKgybsCGK+sDQKgCUqxXkHWW+x6H7Bn37oLCnS6FEGWrZppCfpB2dBROe0BVm9p7x9kjl5lnFAe5L1DBbm1XZj05sTU+k0nSY2S6BT0Jqx5JQcHCrfn9oohoDEaJuSOM4ON5MB6zrQMyIpKkPpe6lKP+hz/jSDbk2WoluxmN73b5gBIF13QOvFR4lglv7ps0mT66w7VuzkXU49kqfrZTf5GPeqYWos3cArny5iweFMTpfAOmbE49h1oXghDUCAwEAAaOB2DCB1TAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRb3LarHkPT1OWHzE20QrJatviPaTCBlQYDVR0jBIGNMIGKgBRb3LarHkPT1OWHzE20QrJatviPaaFcpFowWDELMAkGA1UEBhMCVVMxEDAOBgNVBAoMB1N1cmVpZnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwXT25lTG9naW4gQWNjb3VudCAxMjYwMziCFB1PtBofvQtzF+XCO2yUTz0tXo93MA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQUFAAOCAQEARE0KCrNCVz8ll74g7IIMxLTPOSDRyy4neHTg+xi0wJEBd1R9dN2atkIBL7kR8QtmBqTr6WbYTAMjE4VC3L95xZb8dQdw9VA3dOEfLxjsQN6ihbdffwEgaWp7W4nNkWxcp+1KWCDpMo5nby6NVLAjRjr5KpBTeHDVRiAu+QisYF+pX1vPH871If1wEVHhk3GhHLxud1aHvEJE7Q2FaffO/NtfLMG6k4PfY/HhUfJfpjcjDW0IaZuZWvE1yv3p9Z7d++TOEYwdpyFubT/uo+qsdFCKSg6P1VvNtJLhvWLCaHGkEfQNLF6le8aNz4qL9rtnoFX7Pr1tEwq7p9VAtrWgCQ=="));
});

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
app.locals.staticRoot       = appConfig.getProperty("server_domain");
app.locals.contactNumber       = appConfig.getProperty("contactNumber");
app.locals.contactNumberText       = appConfig.getProperty("contactNumberText");
app.locals.pagesPath        = '/pages';
app.locals.trackingUrl           = appConfig.getProperty("trackingUrl");
app.locals.goAgentWeb           = appConfig.getProperty("goAgentWeb");
app.locals.lifetimeAgentPanel           = appConfig.getProperty("lifetimeAgentPanel");
app.locals.gtmAccountId           = appConfig.getProperty("gtmAccountId");

var thirtyDay = 10 * 86400000;

var redis = null;
redis = new Redis({
      host: appConfig.getProperty('redis_url'),
      port: appConfig.getProperty('redis_port'),
      password: appConfig.getProperty('redis_password'),
      prefix: 'c-sess',
      ttl: 10*86400
});

app.use(session({
    store: new RedisStore({
      client:redis
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
app.use("/favicon.ico", express.static(__dirname +'/dist/images/favicon.ico'));
app.use("/agent", express.static(__dirname +'/dist/'));

app.use(passport.initialize());
app.use(passport.session());

requireFu(__dirname + '/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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

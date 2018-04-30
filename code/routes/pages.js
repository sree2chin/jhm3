var UserService = require('../services/user.js');
var ApiService = require('../services/api.js');
var Sitemap = require('express-sitemap');
var path = require('path');
var _ = require('underscore');
var appConfig = require('../config/service.js');
var fs = require('fs');
var ejs = require('ejs');
var url = require("url");
const queryString = require('query-string');
const passport = require('passport');
var env = process.env.NODE_ENV || 'dev';
const config = require('../config/config')[env];

var serialize = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
module.exports = function(app) {
  app.get('/login',
   passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/login'
      })
  );

  app.post('/login/callback',
     passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
      function(req, res) {
        res.redirect('/');
     }
    );

  app.get('/', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in normal url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.post('/', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in normal post url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/signature', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in normal url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/offer', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in normal url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/payment_success', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in payment_success url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    //req.session.queryParams = req.session.queryParams || {};
    req.session.paymentQueryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.paymentQueryParams = req.session.paymentQueryParams || {};
      for(var k in url_parts.query) {
        req.session.paymentQueryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/payment', function(req, res, next) {
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};
    var html = JSON.parse(req.session.postPayment).body;
    var htmlP = html.split("<head>")

    htmlP[0] = htmlP[0] + "<base href='https://api.demo.convergepay.com/VirtualMerchantDemo/process.do'></base>";
    htmlP[0] = htmlP[0] + " <link href='http://ec2-54-158-63-166.compute-1.amazonaws.com/dist/css/elavon_payment.css' rel='stylesheet'>";
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(htmlP[0] + htmlP[1]);
    //req.session.postPayment = null;
    res.end();
  });


  app.get('/authorize', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session.queryParams = {};

    console.log("\n\n\n in authorise \n\n\n");
    console.log("in authorize url: " + JSON.stringify(url_parts));
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/questions', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    req.session.queryParams = {};
    console.log("in questions url: " + !_.isEmpty(url_parts.query));
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/agent', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/sitemap.xml', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../sitemaps.xml'), function(err){
      if (err) {
          //res.send("<h1 style='color:orangered'>Out site is facing problems in fetching the Sitemaps. Apologies for the inconvenience.</h1>");
        console.log('SITEMAP-REQUEST-ERROR'+ err);
      }
      else
        console.log('SITEMAP-REQUEST-SUCCESS');
    });
  });

  app.get('/favicon.ico', function(req, res) {
    console.log("\n\n\nin favicon server\n\n\n");
    res.status(204);
    res.send();
  });

  app.get('*.map', function(req, res, next) {
    res.rend("");
  });

  app.get('*', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in * url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    //req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });
};
var UserService = require('../services/user.js');
var ApiService = require('../services/api.js');
var Sitemap = require('express-sitemap');
var path = require('path');
var _ = require('underscore');
var config = require('../config/config.json');
var appConfig = require('../config/service.js');
var appConfig = require('../services/quotes.js');
var fs = require('fs');
var ejs = require('ejs');
var url = require("url");

module.exports = function(app) {
  app.use(function (req, res, next) {
      console.log("\n\n\n in app use: " + req.url + "\n\n\n")
      //if(req.url.indexOf("/js") < 0 && req.url.indexOf("/css") < 0 && req.url.indexOf("/fonts") < 0 && req.url.indexOf("/img") < 0
      //    && req.url.indexOf("/installapps") < 0) {
          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
          res.header('Expires', '-1');
          res.header('Pragma', 'no-cache');
      //}
      next()
  });
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
    templatePath = "../../dist/";
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
    templatePath = "../../dist/";
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
    templatePath = "../../dist/";
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
    templatePath = "../../dist/";
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
    templatePath = "../../dist/";
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
    templatePath = "../../dist/";
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
    templatePath = "../../dist/";
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

  app.get('/favicon.ico', function(req, res, next) {
    res.rend("");
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
    templatePath = "../../dist/";
    res.render(templatePath);
  });
};
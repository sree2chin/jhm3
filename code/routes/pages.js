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

  app.get('/', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in normal url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k];
      }
    };
    templatePath = "../../dist/";
    res.render(templatePath);
  });

  app.get('/signature', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in normal url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k];
      }
    };
    templatePath = "../../dist/";
    res.render(templatePath);
  });

  app.get('/questions', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    console.log("in questions url: " + !_.isEmpty(url_parts.query));
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k];
      }
    };
    templatePath = "../../dist/";
    res.render(templatePath);
  });

  app.get('/agent', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k];
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
};
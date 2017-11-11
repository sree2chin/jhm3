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

module.exports = function(app) {

  app.get("/favicon.ico", function(req, res, next) {
    console.log("/favicon.ico");
    res.send("../../dist/favicon.ico");
  });

  app.get('/', function(req, res, next) {
    //res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
    if(req.session) {
      delete req.session.agent_id;
    }

    templatePath = "../../dist/";
    res.render(templatePath);
  });

  app.get('/agent', function(req, res, next) {
    //res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
    if(req.session) {
      if(!_.isEmpty(req.query)) {
        req.session.agent_id = req.query.agent_id || req.query.agentId;
      } else {
        delete req.session.agent_id;
      }
    }
    templatePath = "../../dist/";
    res.render(templatePath);
  });

  app.get('/*', function(req, res, next) {
    //res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
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

  app.get('/api/status', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({"status": 200});
  });
  
};
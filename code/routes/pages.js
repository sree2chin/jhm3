var UserService = require('../services/user.js');
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
var passportConfig = require('../config/passport');

var serialize = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
module.exports = function(app) {

  var samlAuthenticateMiddleware = function(req, res, next) {

    req.session = req.session || {};
    if (req.query.transaction_id) {
      req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
      req.session[req.query.transaction_id].questionsMiddleware = false;
    }

    var url_parts = url.parse(req.url, true);

    if (url_parts.query && url_parts.query.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.query.transaction_id) {
        req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
        if (req.session[req.query.transaction_id].authenticatedOnce) {
          authenticatedOnce = new Date().getTime() - new Date(req.session[req.query.transaction_id].authenticatedTime).getTime() >= 5*60*1000;
        } else {
          shouldAuthenticate = true;
        }
      } else {
        if (req.session.authenticatedOnce) {
          shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 5*60*1000;
        } else {
          shouldAuthenticate = true;
        }
      }

      if (shouldAuthenticate) {
        var queryParamsString = url_parts.search;
        passport.authenticate('saml', { failureRedirect: '/login' + queryParamsString, failureFlash: true })(req, res, next);
      } else {
        next();
      }
    } else {
      next();
    }
  };

  var samlAuthenticateQuestionsMiddleware1 = function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    if (req.query.transaction_id) {
      req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
      req.session[req.query.transaction_id].questionsMiddleware = false;
    }

    var url_parts = url.parse(req.url, true);
    if (url_parts.query && url_parts.query.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.query.transaction_id) {
        req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
        if (req.session[req.query.transaction_id].authenticatedOnce) {
          authenticatedOnce = new Date().getTime() - new Date(req.session[req.query.transaction_id].authenticatedTime).getTime() >= 5*60*1000;
        } else {
          shouldAuthenticate = true;
        }
      } else {
        if (req.session.authenticatedOnce) {
          shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 5*60*1000;
        } else {
          shouldAuthenticate = true;
        }
      }
      if (shouldAuthenticate) {
        var queryParamsString = url_parts.search;
        passport.authenticate('saml', { failureRedirect: '/login' + queryParamsString, failureFlash: true })(req, res, next);
      } else {
        next();
      }
    } else {
      next();
    }
  };
  
  var loginMiddleware = function(req, res, next) {
    console.log("in loginMiddleware");
    req.session = req.session || {};
    if (req.query.transaction_id) {
      req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    }
    var url_parts = url.parse(req.url, true);

    var queryParamsString = url_parts.search;
    passport.authenticate('saml', { failureRedirect: '/login' + queryParamsString, failureFlash: true })(req, res, next);

  };

  app.get("/login", loginMiddleware, function(req,  res, next) {
    req.session = req.session || {};
    if (req.query.transaction_id) {
      req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    }

    var url_parts = url.parse(req.url, true);

    var queryParamsString = url_parts.search;
    res.redirect("/" + queryParamsString);
  });

  app.get("/questions/login", loginMiddleware, function(req,  res, next) {
    console.log("\n\n\n/questions/login\n\n\n");
    req.session = req.session || {};
    req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    var url_parts = url.parse(req.url, true);

    var queryParamsString = url_parts.search;
    var questionsLoginRedirectPage1 = req.session[req.query.transaction_id].questionsLoginRedirectPage1;
    req.session[req.query.transaction_id].questionsLoginRedirectPage1 = null;
    res.redirect("/" + questionsLoginRedirectPage1 + queryParamsString);
  });

  app.get('/', samlAuthenticateMiddleware, function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/index.ejs";
    res.render(templatePath);
  });

  app.post('/', samlAuthenticateMiddleware, function(req, res, next) {
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

  app.get('/signature', samlAuthenticateQuestionsMiddleware1, function(req, res, next) {
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/offer', samlAuthenticateQuestionsMiddleware1, function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in offer url: " + JSON.stringify(url_parts));
    var queryParamsString = url_parts.search;

    res.redirect("/questions" + queryParamsString);
    //templatePath = "./dist/";
    //res.render(templatePath);
  });

  app.get('/payment_success', samlAuthenticateQuestionsMiddleware1, function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    console.log("in payment_success url: " + JSON.stringify(url_parts));
    req.session = req.session || {};
    req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    req.session[req.query.transaction_id].paymentQueryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session[req.query.transaction_id].paymentQueryParams = req.session[req.query.transaction_id].paymentQueryParams || {};
      for(var k in url_parts.query) {
        req.session[req.query.transaction_id].paymentQueryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/payment', function(req, res, next) {
    req.session = req.session || {};
    req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    var html = JSON.parse(req.session[req.query.transaction_id].postPayment).body;
    var htmlP = html.split("<head>")

    htmlP[0] = htmlP[0] + `<base href=${req.session[req.query.transaction_id].postPaymentElavonUrl}></base>`;
    htmlP[0] = htmlP[0] + " <link href='http://ec2-54-158-63-166.compute-1.amazonaws.com/dist/css/elavon_payment.css' rel='stylesheet'>";
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(htmlP[0] + htmlP[1]);
    res.end();
  });


  app.get('/authorize', function(req, res, next) {
    templatePath = "./dist/";
    res.render(templatePath);
  });

  var samlAuthenticateQuestionsMiddleware = function(req, res, next) {
    req.session = req.session || {};
    req.session.questionsMiddleware = true;
    var url_parts = url.parse(req.url, true);

    if (req.query.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.session.authenticatedOnce) {
        shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 1*60*1000;
      } else {
        shouldAuthenticate = true;
      }
      if (shouldAuthenticate) {
        req.session.questionsLoginRedirectPage = req.url;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  };

  app.get('/questions', samlAuthenticateQuestionsMiddleware, function(req, res, next) {
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/unsubscribe', function(req, res, next) {
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.get('/agent', samlAuthenticateMiddleware, function(req, res, next) {
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
/*
  app.get('/favicon.ico', function(req, res) {
    res.status(204);
    res.send();
  });
*/
  app.get('*.map', function(req, res, next) {
    res.rend("");
  });

  app.get('*', function(req, res, next) {    
    templatePath = "./dist/";
    res.render(templatePath);
  });
};
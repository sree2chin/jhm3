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

  var samlAuthenticateMiddleware = function(req, res, next) {
    req.session = req.session || {};
    req.session.questionsMiddleware = false;
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };

    if (url_parts.query && url_parts.query.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.session.authenticatedOnce) {
        shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 1*60*1000;
      } else {
        shouldAuthenticate = true;
      }
      if (shouldAuthenticate) {
        var queryParams = url_parts.query;
        var queryParamsString = "?";
        for(var k in queryParams) {
          if (queryParams[k]) {
            queryParamsString += k + "=" + queryParams[k] + "&";
          } else {
            queryParamsString += k + "&";
          }
        }
        queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
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
    req.session.queryParams = {};
    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    req.session.questionsMiddleware = true;

    var url_parts = url.parse(req.url, true);
    if (url_parts.query && url_parts.query.agent_number) {
      var shouldAuthenticate;
      if (req.session.authenticatedOnce) {
        shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 1*60*1000;
      } else {
        shouldAuthenticate = true;
      }
      if (shouldAuthenticate) {
        var queryParams = url_parts.query;
        var queryParamsString = "?";
        for(var k in queryParams) {
          if (queryParams[k]) {
            queryParamsString += k + "=" + queryParams[k] + "&";
          } else {
            queryParamsString += k + "&";
          }
        }
        queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
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
    req.session.queryParams = req.session.queryParams || {};
    var queryParams = req.session.queryParams;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    passport.authenticate('saml', { failureRedirect: '/login' + queryParamsString, failureFlash: true })(req, res, next);

  };

  app.get("/login", loginMiddleware, function(req,  res, next) {
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};
    var queryParams = req.session.queryParams;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    res.redirect("/" + queryParamsString);
  });

  app.get('/saml/Metadata',
    function(req, res) {
      res.type('application/xml');
      res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8')));
    }
  );

  app.get("/questions/login", loginMiddleware, function(req,  res, next) {
    console.log("\n\n\n/questions/login\n\n\n");
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};
    var queryParams = req.session.queryParams;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    console.log("req.session.questionsLoginRedirectPage1: " + req.session.questionsLoginRedirectPage1);
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    req.session.questionsLoginRedirectPage1 = null;
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
    templatePath = "./dist/";
    res.render(templatePath);
  });

  app.post('/', samlAuthenticateMiddleware, function(req, res, next) {
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

  app.get('/signature', samlAuthenticateQuestionsMiddleware1, function(req, res, next) {
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

  app.get('/offer', samlAuthenticateQuestionsMiddleware1, function(req, res, next) {
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

  app.get('/payment_success', samlAuthenticateQuestionsMiddleware1, function(req, res, next) {
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

    if (!_.isEmpty(url_parts.query)) {
      req.session.queryParams = req.session.queryParams || {};
      for(var k in url_parts.query) {
        req.session.queryParams[k] = url_parts.query[k] || "";
      }
    };
    templatePath = "./dist/";
    res.render(templatePath);
  });

  var samlAuthenticateQuestionsMiddleware = function(req, res, next) {
    req.session = req.session || {};
    req.session.questionsMiddleware = true;
    var url_parts = url.parse(req.url, true);
    console.log("\n\n\neq.session.queryParams: " + JSON.stringify(req.session.queryParams)+ "\n\n\n\n");
    req.session.queryParams = req.session.queryParams || {};

    if (req.session.queryParams && req.session.queryParams.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.session.authenticatedOnce) {
        shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 1*60*1000;
      } else {
        shouldAuthenticate = true;
      }
      console.log("\n\n\n" + shouldAuthenticate + "\n\n\n");
      if (shouldAuthenticate) {
        var queryParams = req.session.queryParams;
        var queryParamsString = "?";
        for(var k in queryParams) {
          if (queryParams[k]) {
            queryParamsString += k + "=" + queryParams[k] + "&";
          } else {
            queryParamsString += k + "&";
          }
        }
        queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
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

  app.get('/agent', samlAuthenticateMiddleware, function(req, res, next) {
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
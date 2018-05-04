var QuotesService = require('../../services/quotes.js');
var url = require("url");
var _ = require('underscore');
const passport = require('passport');
var env = process.env.NODE_ENV || 'dev';
const config = require('../../config/config')[env];

function endsWith(str, suffix) {
  if (str == null) return true;
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(app) {
  var LOGIN_URL = "/login"
  var prefix = "/v1";

  var samlAuthenticateMiddleware = function(req, res, next) {
    req.session.questionsMiddleware = false;
    console.log("\n\n\nsamlAuthenticateMiddleware quote" + req.session.questionsMiddleware + "\n\n\n");
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};

    if (req.session.queryParams && req.session.queryParams.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.session.authenticatedOnce) {
        shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 5*60*1000;
      } else {
        shouldAuthenticate = true;
      }
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
        req.session.redirectToLogin = true;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  };

  app.post(prefix + '/quote/premiums', samlAuthenticateMiddleware, function(req, res) {
    QuotesService.getQuotePremiums(req, function(statusCode, data){
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.redirectToLogin) {
        req.session.redirectToLogin = false;
        res.send({
          LOGIN_URL: LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/quote/products', samlAuthenticateMiddleware, function(req, res) {
    console.log("\n\n\nin quote/products\n\n\n");
    QuotesService.getQuoteProducts(req, function(statusCode, data){
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.redirectToLogin) {
        req.session.redirectToLogin = false;
        res.send({
          LOGIN_URL: LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/quote/plans', samlAuthenticateMiddleware, function(req, res) {
    QuotesService.getQuotePlans(req, function(statusCode, data){
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.redirectToLogin) {
        req.session.redirectToLogin = false;
        res.send({
          LOGIN_URL: LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/quote/savequote', samlAuthenticateMiddleware, function(req, res) {
    QuotesService.saveQuoteForm(req, function(statusCode, data){
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.redirectToLogin) {
        req.session.redirectToLogin = false;
        res.send({
          LOGIN_URL: LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/quote/submit', samlAuthenticateMiddleware, function(req, res) {
    QuotesService.getQuoteProducts(req, function(statusCode, data){
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.redirectToLogin) {
        req.session.redirectToLogin = false;
        res.send({
          LOGIN_URL: LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });
};

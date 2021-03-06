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
    req.session = req.session || {};
    req.session.questionsMiddleware = false;

    var url_parts = url.parse(req.url, true);
    console.log("\n\n\n\nreq.session[req.query.transaction_id]: " + JSON.stringify(req.session[req.query.transaction_id]));
    if (req.query.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.query.transaction_id) {
        req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
        if (req.session.authenticatedOnce) {
          req.session[req.query.transaction_id].authenticatedOnce = req.session.authenticatedOnce;
          req.session[req.query.transaction_id].authenticatedTime = req.session.authenticatedTime;
          req.session.authenticatedOnce = false;
          req.session.authenticatedTime = null;
        }
        if (req.session[req.query.transaction_id].authenticatedOnce) {
          shouldAuthenticate = new Date().getTime() - new Date(req.session[req.query.transaction_id].authenticatedTime).getTime() >= 5*60*1000;
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
      console.log("req.query: " + JSON.stringify(req.query));
      if (shouldAuthenticate) {
        if (req.query.transaction_id) { 
          req.session.redirectToLogin = false;
          req.session[req.query.transaction_id].redirectToLogin = true;
          req.session.currentTransactionId = req.query.transaction_id;
          req.session[req.query.transaction_id].queryParams = req.query;
        } else {
          req.session.redirectToLogin = true;
        }  
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
      if (req.session[req.query.transaction_id].redirectToLogin) {
        req.session[req.query.transaction_id].redirectToLogin = false;
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
      req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
      if ((req.query.transaction_id && req.session[req.query.transaction_id].redirectToLogin) || req.session.redirectToLogin) {
        if (req.query.transaction_id) {
          req.session[req.query.transaction_id].redirectToLogin = false;
        }
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
      if (req.session[req.query.transaction_id].redirectToLogin) {
        req.session[req.query.transaction_id].redirectToLogin = false;
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
      if (req.session[req.query.transaction_id].redirectToLogin) {
        req.session[req.query.transaction_id].redirectToLogin = false;
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
      if (req.session[req.query.transaction_id].redirectToLogin) {
        req.session[req.query.transaction_id].redirectToLogin = false;
        res.send({
          LOGIN_URL: LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });
};

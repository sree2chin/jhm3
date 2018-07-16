var QuestionsService = require('../../services/questions.js');
const passport = require('passport');
var _ = require('underscore');
var url = require("url");
var env = process.env.NODE_ENV || 'dev';
const config = require('../../config/config')[env];

function endsWith(str, suffix) {
  if (str == null) return true;
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(app) {

  var prefix = "/v1";
  var QUESTIONS_LOGIN_URL = "/questions/login";

  app.post('/login/callback',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
      req.session.authenticatedOnce = true;
      req.session.authenticatedTime = new Date().getTime();
      var queryParams = req.session.queryParams || {};
      var queryParamsString = "?";
      for(var k in queryParams) {
        if (queryParams[k]) {
          queryParamsString += k + "=" + queryParams[k] + "&";
        } else {
          queryParamsString += k + "&";
        }
      }
      queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
      console.log("\n\n\nin login callback: " + queryParamsString + "\n\n\n");
      console.log("\n\n\nin login callback: " + req.session.questionsMiddleware + "\n\n\n");
      if (req.session.questionsMiddleware) {
        res.redirect('/questions' + queryParamsString);
      } else {
        res.redirect('/' + queryParamsString);
      }

    }
  );

  var samlAuthenticateQuestionsMiddleware = function(req, res, next) {
    req.session = req.session || {};
    req.session.questionsMiddleware = true;
    var url_parts = url.parse(req.url, true);
    console.log("\n\n\neq.session.queryParams: " + JSON.stringify(req.session.queryParams)+ "\n\n\n\n");
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};

    if (req.session.queryParams && req.session.queryParams.agent_number && config.passport.saml.on) {
      var shouldAuthenticate;
      if (req.session.authenticatedOnce) {
        shouldAuthenticate = new Date().getTime() - new Date(req.session.authenticatedTime).getTime() >= 5*60*1000;
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
        console.log("\n\n\n eq.originalUrl2: " + req.originalUrl);
        console.log("\n\n\n eq.url: " + req.url);
        req.session.questionsLoginRedirectPage = req.url;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  };

  app.get(prefix + '/questions/questions', samlAuthenticateQuestionsMiddleware, function(req, res) {
    QuestionsService.getQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.questionsLoginRedirectPage && req.session.questionsLoginRedirectPage.length > 0 ) {
        req.session.questionsLoginRedirectPage1 = req.session.questionsLoginRedirectPage;
        req.session.questionsLoginRedirectPage = null;
        res.send({
          LOGIN_URL: QUESTIONS_LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/post/questions/questions', samlAuthenticateQuestionsMiddleware, function(req, res) {
    QuestionsService.postQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.questionsLoginRedirectPage && req.session.questionsLoginRedirectPage.length > 0 ) {
        req.session.questionsLoginRedirectPage1 = req.session.questionsLoginRedirectPage;
        req.session.questionsLoginRedirectPage = null;
        res.send({
          LOGIN_URL: QUESTIONS_LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/questions/post-payment', samlAuthenticateQuestionsMiddleware, function(req, res) {
    QuestionsService.postPayment(req, function(statusCode, data) {
      console.log("return in post payment");
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.questionsLoginRedirectPage && req.session.questionsLoginRedirectPage.length > 0 ) {
        req.session.questionsLoginRedirectPage1 = req.session.questionsLoginRedirectPage;
        req.session.questionsLoginRedirectPage = null;
        res.send({
          LOGIN_URL: QUESTIONS_LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/questions/confirm', samlAuthenticateQuestionsMiddleware, function(req, res) {
    QuestionsService.confirmQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.questionsLoginRedirectPage && req.session.questionsLoginRedirectPage.length > 0 ) {
        req.session.questionsLoginRedirectPage1 = req.session.questionsLoginRedirectPage;
        req.session.questionsLoginRedirectPage = null;
        res.send({
          LOGIN_URL: QUESTIONS_LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/questions/make-payment', samlAuthenticateQuestionsMiddleware, function(req, res) {
    QuestionsService.makePayment(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.questionsLoginRedirectPage && req.session.questionsLoginRedirectPage.length > 0 ) {
        req.session.questionsLoginRedirectPage1 = req.session.questionsLoginRedirectPage;
        req.session.questionsLoginRedirectPage = null;
        res.send({
          LOGIN_URL: QUESTIONS_LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/questions/factorsearch', samlAuthenticateQuestionsMiddleware, function(req, res) {
    QuestionsService.getFactorsearch(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      if (req.session.questionsLoginRedirectPage && req.session.questionsLoginRedirectPage.length > 0 ) {
        req.session.questionsLoginRedirectPage1 = req.session.questionsLoginRedirectPage;
        req.session.questionsLoginRedirectPage = null;
        res.send({
          LOGIN_URL: QUESTIONS_LOGIN_URL
        });
      } else {
        res.send(data);
      }
    });
  });

  app.post(prefix + '/auth/user', function(req, res) {
    QuestionsService.authenticateUser(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/auth/setpassword', function(req, res) {
    QuestionsService.changePassword(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/auth/resend-link', function(req, res) {
    QuestionsService.resentLink(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });



  app.post(prefix + '/error/logs', function(req, res) {
    QuestionsService.logErrors(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

};

var QuestionsService = require('../../services/questions.js');
const passport = require('passport');
var _ = require('underscore');
var url = require("url");

function endsWith(str, suffix) {
  if (str == null) return true;
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(app) {

  var prefix = "/v1";

  app.post('/login/callback',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
      console.log("\n\n\nin login callback req.session.authenticatedTime: " + req.session.authenticatedTime + "\n\n\n");
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
      console.log("\n\n\nin login callback" + queryParamsString + "\n\n\n");
      if (req.session.questionsMiddleware) {
        res.redirect('/questions' + queryParamsString);
      } else {
        res.redirect('/' + queryParamsString);
      }

    }
  );
  var samlAuthenticateMiddleware = function(req, res, next) {
    req.session.questionsMiddleware = false;
    var url_parts = url.parse(req.url, true);
    req.session = req.session || {};
    req.session.queryParams = req.session.queryParams || {};

    if (req.session.queryParams && req.session.queryParams.agent_number) {
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
        passport.authenticate('saml', { failureRedirect: '/login' + queryParamsString, failureFlash: true })(req, res, next);
      } else {
        next();
      }
    } else {
      next();
    }
  };

  app.get(prefix + '/questions/questions', samlAuthenticateMiddleware, function(req, res) {
    QuestionsService.getQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/post/questions/questions', samlAuthenticateMiddleware, function(req, res) {
    QuestionsService.postQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/post-payment', samlAuthenticateMiddleware, function(req, res) {
    QuestionsService.postPayment(req, function(statusCode, data) {
      console.log("return in post payment");
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/confirm', samlAuthenticateMiddleware, function(req, res) {
    QuestionsService.confirmQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/make-payment', samlAuthenticateMiddleware, function(req, res) {
    QuestionsService.makePayment(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/factorsearch', samlAuthenticateMiddleware, function(req, res) {
    QuestionsService.getFactorsearch(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
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

};

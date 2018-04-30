var QuestionsService = require('../../services/questions.js');
const passport = require('passport');

function endsWith(str, suffix) {
  if (str == null) return true;
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(app) {

  var prefix = "/v1";

  app.post('/login/callback',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get(prefix + '/questions/questions', function(req, res) {
    QuestionsService.getQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/post/questions/questions', function(req, res) {
    QuestionsService.postQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/post-payment', function(req, res) {
    QuestionsService.postPayment(req, function(statusCode, data) {
      console.log("return in post payment");
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/confirm', function(req, res) {
    QuestionsService.confirmQuestions(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/make-payment', function(req, res) {
    QuestionsService.makePayment(req, function(statusCode, data) {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post(prefix + '/questions/factorsearch', function(req, res) {
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

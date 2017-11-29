var QuestionsService = require('../../services/questions.js');

function endsWith(str, suffix) {
  if (str == null) return true;
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(app) {

  var prefix = "/v1";

  app.get(prefix + '/questions/questions', function(req, res) {
    QuestionsService.getQuestions(req, function(statusCode, data) {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });
};
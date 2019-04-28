var Api = require('../../services/questions.js');
module.exports = function(app) {
  var prefix = "/v1/notifications";
  app.post(prefix + '/unsubscribe', function(req, res) {    
    Api.unsubscribe(req, function(statusCode, data){      
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });
};
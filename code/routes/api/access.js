var Api = require('../../services/api.js');
module.exports = function(app) {
  var prefix = "/v1";
  app.post(prefix + '/quote/access', function(req, res) {    
    Api.getQuotesAccess(req, function(statusCode, data){      
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });
};
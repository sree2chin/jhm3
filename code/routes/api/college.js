var Api = require('../../services/college.js');

module.exports = function(app) {
  var prefix = "/v1";
  app.get(prefix + '/api/college', function(req, res) {    
    Api.getCollegesList(req, function(statusCode, data){     
      res.statusCode = statusCode;
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });
};
var ApiService  = require('../services/api.js');
var url         = require('url');
var _           = require('underscore');
var async       = require('async');

module.exports = new function() {

  var self = this;

  this.getQuestions = function(req, callback) {
    req.session = req.session || {};
    ApiService.getQuestions(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.postQuestions = function(req, callback) {
    req.session = req.session || {};
    req.session.answered_questions = req.session.answered_questions || [];
    req.session.answered_questions.push(req.body.answered_questions);
    ApiService.postQuestions(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.postPayment = function(req, callback) {
    ApiService.postPayment(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.confirmQuestions = function(req, callback) {
    ApiService.confirmQuestions(req, function(err, res) {

      if (!err && res.statusCode == 200) {
        var responseBody = JSON.parse(JSON.stringify(JSON.parse(res.body)));

        if (responseBody.data && responseBody.data.current_document_data) {
          req.session.envelop_id = responseBody.data.current_document_data.envelop_id;
          req.session.signature_status = responseBody.data.current_document_data.signature_status;
          console.log("\n\n\nreq.session.envelop_id: " + req.session.envelop_id + "\n\n\n");
        }
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.makePayment = function(req, callback) {
    ApiService.makePayment(req, function(err, res) {

      if (!err && res.statusCode == 200) {
        var responseBody = JSON.parse(JSON.stringify(JSON.parse(res.body)));

        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };


  this.authenticateUser = function(req, callback) {
    ApiService.authenticateUser(req, function(err, res) {

      if (!err && res.statusCode == 200) {
        var responseBody = JSON.parse(JSON.stringify(JSON.parse(res.body)));
        //console.log("\n\n\n" + JSON.stringify(res.body) + "\n\n\n");
        if (responseBody.data && responseBody.data.access_token) {
          req.session.queryParams = req.session.queryParams || {};
          req.session.queryParams.access_token = responseBody.data.access_token;
        }
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.changePassword = function(req, callback) {
    ApiService.changePassword(req, function(err, res) {

      if (!err && res.statusCode == 200) {
        //console.log("\n\n\n" + JSON.stringify(res.body) + "\n\n\n");
        var responseBody = JSON.parse(JSON.stringify(JSON.parse(res.body)));
        if (responseBody.data && responseBody.data.access_token) {
          req.session.queryParams = req.session.queryParams || {};
          req.session.queryParams.access_token = responseBody.data.access_token;
        }
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.getFactorsearch = function(req, callback) {
    ApiService.getFactorsearch(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.logErrors = function(req, callback) {
    ApiService.logErrors(req, req.body, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

};

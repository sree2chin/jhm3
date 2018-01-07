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

  this.confirmQuestions = function(req, callback) {
    ApiService.confirmQuestions(req, function(err, res) {
      console.log("res.body")
      if (!err && res.statusCode == 200) {
        if (res.body.data && res.body.data.current_document_data) {
          console.log("\n\n\nreq.session: " + req.session.envelop_id + "\n\n\n")
          req.session.envelop_id = res.body.current_document_data.envelop_id;
          req.session.signature_status = data.current_document_data.signature_status;
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

};

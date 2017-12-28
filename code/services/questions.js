var ApiService  = require('../services/api.js');
var url         = require('url');
var _           = require('underscore');
var async       = require('async');

module.exports = new function() {

  var self = this;

  this.getQuestions = function(req, callback) {
    req.session = req.session || {};
    if(req.session.questions) {
      callback(200, req.session.questions);
      return;
    }
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
    console.log("\n\n\nres.body.answered_questions: " + JSON.stringify(req.body.answered_questions) + "\n\n\n")
    console.log("\n\n\nreq.session.answered_questions: " + JSON.stringify(req.session.answered_questions) + "\n\n\n");
    ApiService.postQuestions(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        req.session.questions = res.body.questions;
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.getFactorsearch = function(req, callback) {
    req.session = req.session || {};
    ApiService.getFactorsearch(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };


};

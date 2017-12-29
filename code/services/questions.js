var ApiService  = require('../services/api.js');
var url         = require('url');
var _           = require('underscore');
var async       = require('async');

module.exports = new function() {

  var self = this;

  this.getQuestions = function(req, callback) {

    /* console.log("req.session.questions: " +  _.isEmpty(req.session.questions));
    if(req.session.questions) {
      callback(200, req.session.questions);
      return;
    } */
    ApiService.getQuestions(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };

  this.postQuestions = function(req, callback) {
    req.session.answered_questions = req.session.answered_questions || [];
    req.session.answered_questions.push(req.body.answered_questions);
    ApiService.postQuestions(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        //req.session.questions = res.body;

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

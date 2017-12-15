var ApiService  = require('../services/api.js');
var url         = require('url');
var _           = require('underscore');
var async       = require('async');

module.exports = new function() {

  var self = this;

  this.getQuestions = function(req, callback) {
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
    ApiService.postQuestions(req.body, function(err, res) {
      if (!err && res.statusCode == 200) {
        req.session.questions = res.body;
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, res.body);
      }
    });
  };
};

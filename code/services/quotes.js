var ApiService  = require('../services/api.js');
var url         = require('url');
var _           = require('underscore');
var async       = require('async');

module.exports = new function() {

  var self = this;

  this.getQuotePremiums = function(req, callback) {
    ApiService.getQuotePremiums(req, function(err, res) {
      var formattedUser = {};
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, data);
      }
    });
  };

  this.getQuoteProducts = function(req, callback) {
    ApiService.getQuoteProducts(req, function(err, res) {
      if (!err && res.statusCode == 200) {
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, err);
      }
    });
  };

  this.getQuotePlans= function(req, callback) {
    ApiService.getQuotePlans(req, function(err, res) {
      if (!err && res.statusCode == 200){
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, err);
      }
    });
  };

  this.saveQuoteForm= function(req, callback) {
    ApiService.saveQuoteForm(req, function(err, res) {
      console.log("err: " + JSON.stringify(err));
      console.log("res: " + JSON.stringify(res));
      if (!err && res.statusCode == 200){
        callback(res.statusCode, res.body);
      } else {
        callback(res.statusCode, err);
      }
    });
  };

  this.get = function(req, callback) {
    if(req.session) {
      callback(req.session.user || {});
    } else {
      callback({});
    }
  };
};

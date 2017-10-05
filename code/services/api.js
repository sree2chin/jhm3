var rest        = require('../services/rest.js');
var request       = require('request');
var appConfig       = require('../config/service.js');
var _           = require('underscore');

var restOptions = {
  host: appConfig.getProperty('service_url'),
  //port: appConfig.getProperty('service_port')
};

module.exports = new function(){

  this.register = function(data, cb){
    restOptions.path = '/api/users/';
      rest.postJSON(_.clone(restOptions),data, function (statusCode, result) {
        cb(statusCode, result);
      });
  };

  this.getQuotePremiums = function(data, cb){
    var options = _.extend({}, restOptions);
    options.path =  '/v1/quote/premiums';
    options.headers = restOptions.headers || {};
    options.headers['Authorization'] = "Basic YWRtaW46NyVkUkdyZVQ=";

    rest.postJSON(_.clone(options), data, function (statusCode, result) {
      cb(statusCode, result);
    });
  };

  this.getQuoteProducts = function(data, cb){
    request({
      url: restOptions.host + '/v1/quote/products', 
      formData: data, 
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.getQuotePlans = function(data, cb){
    request({
      url: restOptions.host + '/v1/quote/plans', 
      formData: data, 
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.socialAuth = function(data, type, cb){
    restOptions.path = '/api/users/authenticate/'+type;
    rest.postJSON(_.clone(restOptions),data, function (statusCode, result) {
      cb(statusCode, result);
    });
  };

  this.login = function(data, cb){
    restOptions.path  = '/api/users/authenticate';
      rest.postJSON(_.clone(restOptions),data, function (statusCode, result) {
      cb(statusCode, result);
    });
  };
};
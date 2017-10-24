var rest        = require('../services/rest.js');
var request       = require('request');
var appConfig       = require('../config/service.js');
var _           = require('underscore');

var restOptions = {
  host: appConfig.getProperty('service_url'),
  //port: appConfig.getProperty('service_port')
};

module.exports = new function(){

  var appendAgentInfo = function(req, data) {
    console.log("req.session: " + JSON.stringify(req.session));
    if(req.session.agent_id) {
      data.type_of_user = "2";
      data.agent_id = req.session.agent_id;
    } else {
      data.type_of_user = "1";
    }
  };

  this.register = function(data, cb){
    restOptions.path = '/api/users/';
      rest.postJSON(_.clone(restOptions),data, function (statusCode, result) {
        cb(statusCode, result);
      });
  };

  this.getQuotePremiums = function(req, cb){
    var data = req.body;
    var url = restOptions.host + '/v1/quote/premiums';
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);
    request({
      url: url, 
      formData: formData, 
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.getQuoteProducts = function(req, cb){
    var data = req.body;
    var url = restOptions.host + '/v1/quote/products';
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);
    request({
      url: url, 
      formData: formData, 
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.getQuotePlans = function(req, cb){
    var data = req.body;
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);

    request({
      url: restOptions.host + '/v1/quote/plans', 
      formData: formData, 
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.saveQuoteForm = function(req, cb){
    var data = req.body;
    appendAgentInfo(req, data);
    console.log("data: " + JSON.stringify(data));
    request({
      url: restOptions.host + '/v1/quote/savequote', 
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
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
    if(req.session) {
      console.log("req.session.queryParams: in append: " + JSON.stringify(req.session.queryParams));
      if (req.session && req.session.queryParams) {
        for(var k in req.session.queryParams) {
          data[k] = req.session.queryParams[k];
        }
      }
    }
  };

  this.getQuotePremiums = function(req, cb){
    var data = req.body;
    var url = restOptions.host + '/v1/quote/premiums';
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);
    console.log("getQuotePremiums: " + formData.user);
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
    console.log("getQuoteProducts: " + formData.user);
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
    console.log("getQuotePlans: " + formData.user);
    request({
      url: restOptions.host + '/v1/quote/productplans',
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
    console.log("getQuotePlans: " + data.user);
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

  this.getQuestions = function(req, cb){
    var data = {};
    appendAgentInfo(req, data);
    console.log("getQuestions: " + data.user);
    request({
      url: restOptions.host + '/v1/questions/questions',
      formData: data,
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.postQuestions = function(req, cb){
    var formData = {
      input_json: JSON.stringify(req.body.questions.data),
      answered_questions: JSON.stringify(req.body.answered_questions)
    };
    appendAgentInfo(req, formData);
    console.log("postQuestions: " + formData.user);
    request({
      url: restOptions.host + '/v1/questions/questions',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.getFactorsearch = function(req, cb) {
    appendAgentInfo(req, req.body);
    console.log("postQuestions: " + req.body.user);
    request({
      url: restOptions.host + '/v1/questions/factorsearch',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: req.body
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };
};
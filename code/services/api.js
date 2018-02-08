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
      if (req.session && req.session.queryParams) {
        for(var k in req.session.queryParams) {
          data[k] = req.session.queryParams[k];
        }
      }
    }
  };

  this.getQuotePremiums = function(req, cb) {
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

  this.getQuoteProducts = function(req, cb) {
    var data = req.body;
    var url = restOptions.host + '/v1/quote/products';
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);
    console.log("formData: " + JSON.stringify(formData));
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
    };
    if (!_.isEmpty(req.body.answered_questions)) {
      formData.answered_questions = JSON.stringify(req.body.answered_questions)
    }
    appendAgentInfo(req, formData);

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

  this.postPayment = function(req, cb){
    var paymentConfig = JSON.parse(JSON.stringify(appConfig.getProperty("payment")));
    paymentConfig.amount = req.body.amount;
    paymentConfig.order_id = req.body.order_id;
    request({
      url: paymentConfig.url,
      method: 'POST',
      form: paymentConfig
    }, function callback(err, httpResponse, body) {
      req.session.postPayment = JSON.stringify(httpResponse);
      console.log("httpResponse in response: " + JSON.stringify(httpResponse));
      cb(err, httpResponse);
    });
  };

  this.confirmQuestions = function(req, cb){

    var formData = {};
    if(req.session.envelop_id)      {
      formData.envelop_id = req.session.envelop_id
    }
    if (req.session.queryParams && req.session.queryParams.event == "signing_complete") {
      formData.signature_status = "1";
    } else {
      formData.signature_status = "0";
    }

    appendAgentInfo(req, formData);
    console.log("formData: " + JSON.stringify(formData));
    request({
      url: restOptions.host + '/v1/questions/confirm',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      console.log("\n\n\nhttpResponse: " + JSON.stringify(httpResponse) + "\n\n\n");
      cb(err, httpResponse);
    });
  };

  this.makePayment = function(req, cb){

    var formData = {};
    formData.payment_response_data = JSON.stringify(req.body);
    formData.transaction_id = req.body.ssl_txn_id;
    formData.amount = req.body.ssl_amount;

    appendAgentInfo(req, formData);
    console.log("formData: " + JSON.stringify(formData));
    request({
      url: restOptions.host + '/v1/questions/makepayment',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };


  this.authenticateUser = function(req, cb){

    var formData = {};
    formData.password = req.body.password;
    appendAgentInfo(req, formData);
    console.log("authenticateUser formData: " + JSON.stringify(formData));
    request({
      url: restOptions.host + '/v1/auth/user',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };

  this.changePassword = function(req, cb){

    var formData = {};
    formData.password = req.body.password;
    formData.new_password = req.body.new_password;
    appendAgentInfo(req, formData);
    console.log("\n\n\nformData: " + JSON.stringify(formData) +  "\n\n\n");
    request({
      url: restOptions.host + '/v1/auth/setpassword',
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
    var data = {
      questionId: req.body.questionId,
      assessment_factor_url: req.body.assessment_factor_url,
      q: req.body.q
    };
    appendAgentInfo(req, data);
    request({
      url: restOptions.host + '/v1/questions/factorsearch',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: data
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };
};
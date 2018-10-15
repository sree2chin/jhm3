var rest        = require('../services/rest.js');
var request       = require('request');
var url = require('url');
var appConfig       = require('../config/service.js');
var _           = require('underscore');
const uuidV1 = require('uuid/v1');

var restOptions = {
  host: appConfig.getProperty('server_domain'),
  //port: appConfig.getProperty('service_port')
};

module.exports = new function(){

  var self = this;
  var appendAgentInfo = function(req, data) {
    if(req.session) {
      if (req.session && req.session.queryParams) {
        for(var k in req.session.queryParams) {
          data[k] = req.session.queryParams[k];
        }
      }
      if (req.session.uniqueTransactionId) {
        data["transaction_id"] = req.session.uniqueTransactionId;
      }
    }
  };

  var appendAgentPaymentInfo = function(req, data) {
    if(req.session) {
      if (req.session && req.session.paymentQueryParams) {
        for(var k in req.session.paymentQueryParams) {
          data[k] = req.session.paymentQueryParams[k];
        }
      }
    }
  };

  this.getQuotesAccess = function(req, cb){
    var options = {
      url: restOptions.host + '/v1/quote/access',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var formData = Object.assign({},query,req.body);    
    options.formData = formData;
    if(Object.keys(formData).length > 0){
      options.formData = formData;
    }

    if(options.formData.vdtca == null){
      options.formData.vdtca = "";
    }
    
    request(options, function callback(err, httpResponse, body) {
      if (httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/quote/access",
            inputParams: {},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for api: /v1/quote/access");
          });
      }
      cb(httpResponse.statusCode, httpResponse.body);
    });
  };

  var appendQueryParams = function (req, data) {
    if(req.query) {
      for(var k in req.query) {
        data[k] = req.query[k];
      }
    }
  }

  this.getQuotePremiums = function(req, cb) {
    var data = req.body;
    var url = restOptions.host + '/v1/quote/premiums';
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    console.log("\n\n\n in getQuotePremiums formData: " + JSON.stringify(formData) + "\n\n\n");
    request({
      url: url,
      formData: formData,
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      if (httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/quote/premiums",
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for api: /v1/quote/premiums");
          });
      }
      cb(err, httpResponse);
    });
  };

  this.getQuoteProducts = function(req, cb) {
    var data = req.body;
    var url = restOptions.host + '/v1/quote/products';
    var formData = {
      applicants: JSON.stringify(data)
    };
    console.log("req.query.isFromMainPage: " + JSON.stringify(req.query.isFromMainPage));

    if (req.query.isFromMainPage == true || req.query.isFromMainPage == "true") {
      req.session.uniqueTransactionId = uuidV1();
    }
    console.log("req.session.uniqueTransactionId: " + JSON.stringify(req.session.uniqueTransactionId));
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    console.log("\n\n\nin getQuoteProducts formData: " + JSON.stringify(formData) + "\n\n\n");
    request({
      url: url,
      formData: formData,
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/quote/products",
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for api: /v1/quote/products: " + httpResponse.body);
          });
          cb(err, httpResponse);
      } else {
        httpResponse.body = httpResponse.body || {};
        httpResponse.body = JSON.parse(httpResponse.body);
        httpResponse.body.uniqueTransactionId = req.session.uniqueTransactionId;
        cb(err, httpResponse);
      }

    });
  };

  this.getQuotePlans = function(req, cb){
    var data = req.body;
    var formData = {
      applicants: JSON.stringify(data)
    };
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    console.log("\n\n\nin getQuotePlans formData: " + JSON.stringify(formData) + "\n\n\n");
    request({
      url: restOptions.host + '/v1/quote/productplans',
      formData: formData,
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      if (httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/quote/productplans",
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for api: /v1/quote/productplans");
          });
      }
      cb(err, httpResponse);
    });
  };

  this.saveQuoteForm = function(req, cb){
    var data = req.body;
    appendAgentInfo(req, data);
    appendQueryParams(req, data);
    console.log("\n\n\nin saveQuoteForm formData: " + JSON.stringify(data) + "\n\n\n");
    request({
      url: restOptions.host + '/v1/quote/savequote',
      formData: data,
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      if (httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/quote/premiums",
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for api: /v1/quote/premiums");
          });
      }
      cb(err, httpResponse);
    });
  };

  this.getQuestions = function(req, cb){
    var data = {};
    appendAgentInfo(req, data);
    appendQueryParams(req, data);
    console.log("\n\n\nin getQuestions formData: " + JSON.stringify(data) + "\n\n\n");
    if (req.session.queryParams && req.session.queryParams.event == "signing_complete") {
      delete req.session.queryParams.event;
      if(req.session.envelop_id)      {
        data.envelop_id = req.session.envelop_id;
        delete req.session.envelop_id;
      }
      data.signature_status = "1";
    } else {
      data.signature_status = "0";
    }
    request({
      url: restOptions.host + '/v1/questions/questions',
      formData: data,
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/questions/questions",
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for GET api: /v1/questions/questions");
          });
      }
      cb(err, httpResponse);
    });
  };

  this.postQuestions = function(req, cb){
    var formData = {
      input_json: JSON.stringify(req.body.questions.data),
    };
    if (!_.isEmpty(req.body.answered_questions)) {
      formData.answered_questions = JSON.stringify(req.body.answered_questions);
    }
    if (!_.isEmpty(req.body.current_index)) {
      formData.current_index = req.body.current_index;
    }
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    if (req.session.queryParams && req.session.queryParams.event == "signing_complete") {
      delete req.session.queryParams.event;
      if(req.session.envelop_id) {
        formData.envelop_id = req.session.envelop_id;
        delete req.session.envelop_id;
      }
      formData.signature_status = "1";
    } else {
      formData.signature_status = "0";
    }
    request({
      url: restOptions.host + '/v1/questions/questions',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: "/v1/questions/questions",
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: /v1/questions/questions");
          });
      }
      cb(err, httpResponse);
    });
  };

  this.postPayment = function(req, cb){
    var paymentConfig = JSON.parse(JSON.stringify(appConfig.getProperty("payment")));
    var elavonConfig = req.body.elavon_params;
    if (_.isEmpty(elavonConfig)) {
      this.makePayment1(req, cb, true);
      return;
    }
    console.log("\n\n\n in postPayment" + JSON.stringify(elavonConfig) + "\n\n\n");
    console.log("in postPayment req.body.elavon_url: " + req.body.elavon_url + "\n\n\n");
    elavonConfig.url = req.body.elavon_url;
    //appendQueryParams(req, elavonConfig);
    request({
      url: req.body.elavon_url,
      method: 'POST',
      form: elavonConfig
    }, function callback(err, httpResponse, body) {
      req.session.postPayment = JSON.stringify(httpResponse);
      req.session.postPaymentElavonUrl = req.body.elavon_url;
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: req.body.elavon_url,
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: " + req.body.elavon_url);
          });
      }
      cb(err, httpResponse);
    });
  };

  this.confirmQuestions = function(req, cb){

    var formData = {};
    console.log("\n\n\nreq.session.envelop_id: req.session.envelop_id: " + req.session.envelop_id);
    if (req.session.queryParams && req.session.queryParams.event == "signing_complete") {
      delete req.session.queryParams.event;
      if(req.session.envelop_id)      {
        formData.envelop_id = req.session.envelop_id;
        delete req.session.envelop_id;
      }
      formData.signature_status = "1";
    } else {
      formData.signature_status = "0";
    }

    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    if (req.body.review_confirm == 1) {
      formData.review_confirm = 1;
    }
    console.log("\n\n\nin confirmQuestions formData: " + JSON.stringify(formData) + "\n\n\n");
    request({
      url: restOptions.host + '/v1/questions/questions',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/questions/questions',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST confirm questions api: " + '/v1/questions/questions');
          });
      }
      cb(err, httpResponse);
    });
  };

  this.makePayment1 = function(req, cb){

    var formData = {};
    formData.payment_response_data = JSON.stringify([]);

    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    if (req.session.queryParams && req.session.queryParams.event == "signing_complete") {
      delete req.session.queryParams.event;
      if(req.session.envelop_id)      {
        formData.envelop_id = req.session.envelop_id;
        delete req.session.envelop_id;
      }
      formData.signature_status = "1";
    } else {
      formData.signature_status = "0";
    }
    console.log("\n\n\nformData in makePayment1: " + JSON.stringify(formData) + "\n\n\n");
    request({
      url: restOptions.host + '/v1/questions/questions',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      console.log("\n\n\n ttpResponse in makePayment1: " + JSON.stringify(httpResponse) + "\n\n\n");
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/questions/questions',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST makePayment1 api: " + '/v1/questions/questions');
          });
      }
      var responseBody = JSON.parse(JSON.stringify(JSON.parse(httpResponse.body)));

      if (responseBody && responseBody.data && responseBody.data.current_document_data) {
        req.session.envelop_id = responseBody.data.current_document_data.envelop_id;
        req.session.signature_status = responseBody.data.current_document_data.signature_status;
        console.log("\n\n\nreq.session.envelop_id: " + req.session.envelop_id + "\n\n\n");
      }
      cb(err, httpResponse);
    });
  };

  this.makePayment = function(req, cb){

    var formData = {};
    formData.payment_response_data = JSON.stringify(req.body);
    formData.transaction_id = req.body.ssl_txn_id;
    formData.amount = req.body.ssl_amount;

    appendAgentPaymentInfo(req, formData);
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    if (req.session.queryParams && req.session.queryParams.event == "signing_complete") {
      delete req.session.queryParams.event;
      if(req.session.envelop_id)      {
        formData.envelop_id = req.session.envelop_id;
        delete req.session.envelop_id;
      }
      formData.signature_status = "1";
    } else {
      formData.signature_status = "0";
    }
    console.log("\n\n\nformData in makePayment: " + JSON.stringify(formData) + "\n\n\n");
    request({
      url: restOptions.host + '/v1/questions/questions',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/questions/questions',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST makePayment api: " + '/v1/questions/questions');
          });
      }
      cb(err, httpResponse);
    });
  };


  this.authenticateUser = function(req, cb){

    var formData = {};
    formData.password = req.body.password;
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    console.log(restOptions.host + '/v1/auth/user');
    console.log("authenticateUser formData: " + JSON.stringify(formData));
    request({
      url: restOptions.host + '/v1/auth/user',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/auth/user',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: " + '/v1/auth/user');
          });
      }
      cb(err, httpResponse);
    });
  };

  this.changePassword = function(req, cb){

    var formData = {};
    formData.password = req.body.password;
    formData.new_password = req.body.new_password;
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    console.log("\n\n\n changePassword formData: " + JSON.stringify(formData) +  "\n\n\n");
    request({
      url: restOptions.host + '/v1/auth/setpassword',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/auth/setpassword',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: " + '/v1/auth/setpassword');
          });
      }
      cb(err, httpResponse);
    });
  };

  this.resentLink = function(req, cb){
    var formData = {};
    //formData.password = req.body.password;
    //formData.new_password = req.body.new_password;
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    console.log("\n\n\n changePassword formData: " + JSON.stringify(formData) +  "\n\n\n");
    request({
      url: restOptions.host + '/v1/auth/gen_authcode',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body && (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/auth/gen_authcode',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: " + '/v1/auth/setpassword');
          });
      }
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
    appendQueryParams(req, data);
    request({
      url: restOptions.host + '/v1/questions/factorsearch',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: data
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body &&  (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/questions/factorsearch',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: " + '/v1/questions/factorsearch');
          });
      }
      cb(err, httpResponse);
    });
  };

  this.logErrors = function(req, data, cb){
    var formData = {};
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    if (data.user) {
      formData.user = data.user;
    }
    if (data.inputParams) {
      formData.input_params = JSON.stringify(data.inputParams);
    }
    if (data.response) {
      formData.response = data.response;
    }
    if (data.expection) {
      formData.raised_exception = data.expection;
    }
    if (data.errorMessage) {
      formData.error_message = data.errorMessage;
    }

    formData.api_name = data.apiName;

    console.log("formData in log errors: " + JSON.stringify(formData));
    request({
      url: restOptions.host + '/v1/createlogs/create_log',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST',
      formData: formData
    }, function callback(err, httpResponse, body) {
      cb(err, httpResponse);
    });
  };
};
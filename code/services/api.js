var rest        = require('../services/rest.js');
var request       = require('request');
var url = require('url');
var appConfig       = require('../config/service.js');
var _           = require('underscore');
const uuidV1 = require('uuid/v1');
var PAGES_LIST = require("./../pages.json");

var restOptions = {
  host: appConfig.getProperty('server_domain'),
  //port: appConfig.getProperty('service_port')
};

module.exports = new function(){
 
  var self = this;
  var appendAgentInfo = function(req, data) {
    if(req.session) {
      // if (req.session && req.session.queryParams) {
      //   for(var k in req.session.queryParams) {
      //     data[k] = req.session.queryParams[k];
      //   }
      // }
      // if (req.session.uniqueTransactionId) {
      //   data["transaction_id"] = req.session.uniqueTransactionId;
      // }
    }
  };

  var appendAgentPaymentInfo = function(req, data) {
    if(req.session && req.session[req.query.transaction_id]) {
      if (req.session[req.query.transaction_id].paymentQueryParams) {
        for(var k in req.session[req.query.transaction_id].paymentQueryParams) {
          data[k] = req.session[req.query.transaction_id].paymentQueryParams[k];
        }
      }
    }
  };

  this.getQuotesAccess = function(req, cb){
    var uniqueTransactionId, firstTime = true;
    var options = {
      url: restOptions.host + '/v1/quote/access',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ="
      },
      method: 'POST'
    }
    var formData = req.body;  
    formData.page_id = PAGES_LIST.LANDING_PAGE.page_id; 
    formData.page_title = PAGES_LIST.LANDING_PAGE.page_title; 
    //appendAgentInfo(req, formData);
    console.log("req.body: " + JSON.stringify(req.body));
    if (!req.body.transaction_id && !req.session.uniqueTransactionId) {
      uniqueTransactionId = uuidV1() + "_" + new Date().getTime();
      req.session.uniqueTransactionId = uniqueTransactionId;
      req.session[uniqueTransactionId] = {};
    } else {
      firstTime = false;
      uniqueTransactionId = req.body.transaction_id || req.session.uniqueTransactionId;
    }
    formData.transaction_id = uniqueTransactionId;
    console.log("req.session.uniqueTransactionId: " + JSON.stringify(uniqueTransactionId));
    appendQueryParams(req, formData);
    options.formData = formData;
    console.log("\n\n\nformData: " + JSON.stringify(formData) + "\n\n\n");
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
      httpResponse.body = httpResponse.body || {};
      httpResponse.body = JSON.parse(httpResponse.body);
      httpResponse.body.uniqueTransactionId = uniqueTransactionId;
      httpResponse.body.firstTime = firstTime;
      cb(httpResponse.statusCode, httpResponse.body);
    });
  };

  var appendQueryParams = function (req, data) {
    if(req.query) {
      console.log("\n\n\nreq.query: " + JSON.stringify(req.query) + "\n\n\n");
      for(var k in req.query) {
        if (req.query[k] && req.query[k] != "undefined") {
          data[k] = req.query[k];
        } else if (req.query[k] == ""){
          data[k] = req.query[k];
        }
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
    var formData = {};

    console.log("req.body.uniqueTransactionId getQuoteProducts: ", req.body);
    if (req.body.uniqueTransactionId) {
      formData.transaction_id = req.body.uniqueTransactionId;
    }

    formData.applicants = JSON.stringify(data);
    formData.page_id = PAGES_LIST.PRODUCT_PAGE.page_id; 
    formData.page_title = PAGES_LIST.PRODUCT_PAGE.page_title; 
    console.log("req.query.isFromMainPage: " + JSON.stringify(req.query.isFromMainPage));
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    req.session.uniqueTransactionId = null;
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
        httpResponse.body.uniqueTransactionId = req.body.uniqueTransactionId;
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
    formData.page_id = PAGES_LIST.PLANS_PAGE.page_id; 
    formData.page_title = PAGES_LIST.PLANS_PAGE.page_title; 
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
    data.page_id = PAGES_LIST.NEXT_STEPS_PAGE.page_id; 
    data.page_title = PAGES_LIST.NEXT_STEPS_PAGE.page_title; 
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

  this.getQuestions = function(req, cb, isFromPayment){
    var data = {};
    appendAgentInfo(req, data);
    appendQueryParams(req, data);

    req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    if (req.session[req.query.transaction_id].notFirstTime) {
      data.page_id = PAGES_LIST.QUESTIONS_PAGE.page_id; 
      data.page_title = PAGES_LIST.QUESTIONS_PAGE.page_title;       
    } else {
      req.session[req.query.transaction_id].notFirstTime = true; 
    }

    if (req.query.isFromReviewPage) {
      data.page_id = PAGES_LIST.REVIEW_PAGE.page_id; 
      data.page_title = PAGES_LIST.REVIEW_PAGE.page_title; 
    }
    if (isFromPayment) {
      data.page_id = PAGES_LIST.PAYMENT_PAGE.page_id; 
      data.page_title = PAGES_LIST.PAYMENT_PAGE.page_title; 
    }

    if (req.query.isFromPaymentSuccessPage) {
      data.page_id = PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_id; 
      data.page_title = PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_title; 
      delete req.query.isFromPaymentSuccessPage;
    }
    req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    console.log("req.session[req.query.transaction_id]2: " + JSON.stringify(req.session[req.query.transaction_id]));
    if (req.session[req.query.transaction_id].isFromOfferRoute) {
      data.page_id = PAGES_LIST.OFFER_PAGE.page_id; 
      data.page_title = PAGES_LIST.OFFER_PAGE.page_title; 
      delete req.session[req.query.transaction_id].isFromOfferRoute;
    }

console.log("\n\n\nin getQuestions formData: " + JSON.stringify(data) + "\n\n\n");
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
    req.session[req.query.transaction_id] = req.session[req.query.transaction_id] || {};
    if (req.session[req.query.transaction_id].notFirstTime) {
      formData.page_id = PAGES_LIST.QUESTIONS_PAGE.page_id; 
      formData.page_title = PAGES_LIST.QUESTIONS_PAGE.page_title;     
    }
    if (req.body.isFromEditQuestionsPage) {
      formData.page_id = PAGES_LIST.EDIT_QUESTIONS_PAGE.page_id; 
      formData.page_title = PAGES_LIST.EDIT_QUESTIONS_PAGE.page_title; 
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
    if (req.body.start_coverage == 1) {
      elavonConfig.start_coverage = req.body.start_coverage;
    }
    if (_.isEmpty(elavonConfig)) {
      this.makePayment1(req, cb, true);
      return;
    }
    console.log("\n\n\n in postPayment: " + JSON.stringify(req.body) + "\n\n\n");
    console.log("in postPayment req.body.elavon_url: " + req.body.elavon_url + "\n\n\n");
    elavonConfig.url = req.body.elavon_url;
    //appendQueryParams(req, elavonConfig);
    //if (req.body.isFromOfferPage) {
      this.getQuestions(req, ()=>{}, true);
      delete req.body.isFromOfferPage;
    //}
    request({
      url: req.body.elavon_url,
      method: 'POST',
      form: elavonConfig
    }, function callback(err, httpResponse, body) {
      req.session[req.query.transaction_id].postPayment = JSON.stringify(httpResponse);
      req.session[req.query.transaction_id].postPaymentElavonUrl = req.body.elavon_url;
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
    if (req.body.start_coverage == 1) {
      formData.start_coverage = req.body.start_coverage;
    }
    appendAgentInfo(req, formData);
    appendQueryParams(req, formData);
    if (req.body.isFromOfferPage) {
      formData.page_id = PAGES_LIST.OFFER_PAGE.page_id; 
      formData.page_title = PAGES_LIST.OFFER_PAGE.page_title; 
      delete req.body.isFromOfferPage;
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
        req.session[req.query.transaction_id].signature_status = responseBody.data.current_document_data.signature_status;
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
 
  this.unsubscribe = function(req, cb) {
    var data = {};
    console.log("req.body: req.body: " + JSON.stringify(req.body));
    if (!_.isEmpty(req.body)) {
      data.subscription_option_selected = JSON.stringify(req.body);
    }
    console.log("req.body: req.body: " + JSON.stringify(data));

    appendAgentInfo(req, data);
    appendQueryParams(req, data);
    console.log("\n\n\n unsubscribe data:  " + JSON.stringify(data));
    request({
      url: restOptions.host + '/v1/notifications/unsubscribe',
      headers: {
        'Authorization': "Basic YWRtaW46NyVkUkdyZVQ=",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      formData: data
    }, function callback(err, httpResponse, body) {
      if (httpResponse && httpResponse.body &&  (httpResponse.body.indexOf("A PHP Error was encountered") >-1 || httpResponse.body.indexOf("You have an error in your SQL syntax") >-1)) {
        self.logErrors(req, {
            user: null,
            apiName: '/v1/notifications/unsubscribe',
            inputParams: {applicants: data},
            response: httpResponse.body,
            expection: null,
            error_message: null
          }, function() {
            console.log("Error posted for POST api: " + '/v1/notifications/unsubscribe');
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
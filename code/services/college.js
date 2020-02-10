var ApiService  = require('../services/api.js');
var url         = require('url');
var _           = require('underscore');
var async       = require('async');
var rest        = require('../services/rest.js');
var request       = require('request');
var appConfig       = require('../config/service.js');
var restOptions = {
    host: appConfig.getProperty('server_domain'),
};

this.getCollegesList = function(req, cb){
    console.log("getCollegesList url: ", restOptions.host, '/v1/api/college');
    request({
      url: restOptions.host + '/v1/api/college',
      method: 'GET'
    }, function callback(err, httpResponse, body) {
      cb(httpResponse.statusCode, body);
    });
  };
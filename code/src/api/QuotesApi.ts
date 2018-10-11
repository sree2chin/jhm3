import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { getStates } from '../utility/states';

var QuotesApiI;

var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

findIP.then(ip => {window.currentBrowserIpAddress = ip;}).catch(e => console.error(e));
window.currentBrowserTimezoneOffset = new Date().getTimezoneOffset();
window.currentBrowserTimezoneOffsetFormatted = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]

var queryParms = "?ipAddress=" + window.currentBrowserIpAddress + "&timezoneOffset=" + window.currentBrowserTimezoneOffset +"&timezoneOffsetFormatted=" + window.currentBrowserTimezoneOffsetFormatted + "&currentTime=";

interface QuotesApiI {
  submit: any;
  submitProductsForm: any;
  plansSubmit: any;
  saveQuoteForm: any;
}

class QuotesApi {

  submit(payload, isFromMainPage) {
    var q = queryParms;
    q = q + new Date().getTime() + '&isFromMainPage=' + isFromMainPage;
    return fetch('/v1/quote/products' + q, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(function(res) {
        return res.json().then(function (response: any) {
          return new Promise(function(resolve, reject) {
            resolve(response)
          });
        })
    });
  };

  submitProductsForm(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/quote/plans' + q, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(function(res) {
        return res.json().then(function (response: any) {
          return new Promise(function(resolve, reject) {
            resolve(response)
          });
        })
    });
  };


  plansSubmit(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/quote/premiums' + q, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(function(res) {
        return res.json().then(function (response: any) {
          return new Promise(function(resolve, reject) {
            resolve(response)
          });
        })
    });
  };

  saveQuoteForm(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/quote/savequote' + q, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(function(res) {
        return res.json().then(function (response: any) {
          return new Promise(function(resolve, reject) {
            resolve(response)
          });
        })
    });
  };
}

export default new QuotesApi();

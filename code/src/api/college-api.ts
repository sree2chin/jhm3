import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { Promise } from 'es6-promise';

var CollegeApi;

// var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

// findIP.then(ip => {window.currentBrowserIpAddress = ip;}).catch(e => console.error(e));
// window.currentBrowserTimezoneOffset = new Date().getTimezoneOffset();
// window.currentBrowserTimezoneOffsetFormatted = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];

class CollegeApi {
    getCollegesList(){ 
    // var queryParms = String(window.location.search) + "&ipAddress=" + window.currentBrowserIpAddress + "&timezoneOffset=" + window.currentBrowserTimezoneOffset + "&timezoneFormatted=" + window.currentBrowserTimezoneOffsetFormatted + "&currentTime="; 
    // var q = queryParms;
    // q = q + new Date().getTime();  
    return fetch('/v1/api/college', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(function(res) {
        return res.json().then(function (response) {
          return new Promise(function(resolve, reject) {
            resolve(response)
          });
        })
    });
  };
}
export default new CollegeApi();
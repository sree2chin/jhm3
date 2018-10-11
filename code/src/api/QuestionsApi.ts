import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";

var QuestionsApiI;

var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

findIP.then(ip => {window.currentBrowserIpAddress = ip;}).catch(e => console.error(e));
window.currentBrowserTimezoneOffset = new Date().getTimezoneOffset();

var queryParms = "?ipAddress=" + window.currentBrowserIpAddress + "&timezoneOffset=" + window.currentBrowserTimezoneOffset + "&currentTime=";


interface QuotesApiI {
  get: any
}

class QuestionsApi {

  get() : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/questions/questions' + q, {
        method: "GET",

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
    })
  }

  post(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/post/questions/questions' + q, {
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
    })
  };

  confirm(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/questions/confirm' + q, {
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
    })
  };

  makePayment(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/questions/make-payment' + q, {
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
    })
  };

  postPayment(payload) : Promise<any> {
    var errRes;
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/questions/post-payment' + q, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(function(res) {
        errRes = res;
        console.log("sdfs");
        console.log("sdfs");
        var r;
        try {
           r = res.json().then(function (response: any) {
            return new Promise(function(resolve, reject) {
              resolve(response)
            });
          }).catch(function(e) {
            return new Promise(function(resolve, reject) {
              resolve(e)
            });
          });;
        } catch(e) {
          console.log(e);
          return new Promise(function(resolve, reject) {
            resolve(e)
          });
          // r = res.json().then(function (response: any) {
          //   return new Promise(function(resolve, reject) {
          //     resolve(response)
          //   });
          // });
        }
        return r;
    })
  };

  authenticateUser(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/auth/user' + q, {
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
    })
  };

  changePassword(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/auth/setpassword' + q, {
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
    })
  };

  sendResetLink(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/auth/resend-link' + q, {
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
    })
  };

  getFactorsearch(payload) : Promise<any> {
    var q = queryParms;
    q += new Date().getTime();
    return fetch('/v1/questions/factorsearch' + q, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(function(res) {
        return res.json().then(function (response: any) {
            return response;
        })
    })
  };


}

export default new QuestionsApi();

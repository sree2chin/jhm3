import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";

var QuestionsApiI;

interface QuotesApiI {
  get: any
}

class QuestionsApi {

  get() : Promise<any> {
    return fetch('/v1/questions/questions', {
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
    return fetch('/v1/post/questions/questions', {
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
    return fetch('/v1/questions/confirm', {
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
    return fetch('/v1/questions/make-payment', {
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
    return fetch('/v1/questions/post-payment', {
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
           r = res.text().then(function (response: any) {
            return new Promise(function(resolve, reject) {
              resolve(response)
            });
          });
        }
        catch(e) {
          console.log(e);
          r = res.text().then(function (response: any) {
            return new Promise(function(resolve, reject) {
              resolve(response)
            });
          });
        }
        return r;
    })
  };

  authenticateUser(payload) : Promise<any> {
    return fetch('/v1/auth/user', {
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
    return fetch('/v1/auth/setpassword', {
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
    return fetch('/v1/questions/factorsearch', {
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

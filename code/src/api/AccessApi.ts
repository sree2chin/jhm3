import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { Promise } from 'es6-promise';

var AccessApiI;

interface AccessApiI {
    getQuoteAccess: any;
}

class AccessApi {
    getQuoteAccess(payload) : Promise<any> {    
    return fetch('/v1/quote/access', {
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
export default new AccessApi();
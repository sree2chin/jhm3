import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { getStates } from '../utility/states';

var QuotesApiI; 

interface QuotesApiI {
  submit: any;
  submitProductsForm: any;
  plansSubmit: any;
  saveQuoteForm: any;
}

class QuotesApi {
  submit(payload) {
    return fetch('/v1/quote/products', {
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
    return fetch('/v1/quote/plans', {
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
    return fetch('/v1/quote/premiums', {
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
    return fetch('/v1/quote/savequote', {
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

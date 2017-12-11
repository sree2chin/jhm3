import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { getStates } from '../utility/states';

var QuestionsApiI; 

interface QuotesApiI {
  get: any
}

class QuestionsApi {


  get(payload) : Promise<any> {
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
  };

  
}

export default new QuestionsApi();

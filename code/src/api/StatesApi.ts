import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { getStates } from '../utility/states';

class StatesApi {
  getStatesList() {

    return new Promise(resolve) {
      resolve(getStates());
    }

    /*return fetch('quote/states').then(function(res) {
        var states;

        return res.json().then(function (response: any) {
          members = response.map((state) => {
            var state;

            state.id = gitHubMember.id;
            state.name = gitHubMember.name;

            return state;
          });

          return states;
        })

    }));*/
  }

}

export default new StatesApi();

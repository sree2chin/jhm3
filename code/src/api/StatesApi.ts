import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import { getStateObjects } from '../utility/states';

class StatesApi {
  getStatesList() {
    return getStateObjects();
  }

}

export default new StatesApi();

import { combineReducers } from 'redux';
import states from './StatesReducer';
import quotes from './quotesReducer';
import college from './collegeReducer';
import selectPersons from './selectPersons';

export default combineReducers({
  states,
  quotes,
  college,
  selectPersons
});

import { combineReducers } from 'redux';
import states from './StatesReducer';
import quotes from './quotesReducer';
import questions from './questionsReducer';
import selectPersons from './selectPersons';

export default combineReducers({
  states,
  quotes,
  questions,
  selectPersons
});

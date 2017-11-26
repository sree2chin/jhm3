import { combineReducers } from 'redux';
import member from './memberReducer';
import members from './membersReducer';
import states from './StatesReducer';
import quotes from './quotesReducer';
import questions from './questionsReducer';
import selectPersons from './selectPersons';

export default combineReducers({
  member,
  members,
  states,
  quotes,
  questions,
  selectPersons
});

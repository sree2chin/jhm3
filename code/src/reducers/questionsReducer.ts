import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'FETCHING_QUESTIONS':
      return objectAssign({}, state, {questions: action.questions});
      case 'POSTING_QUESTIONS':
    	return objectAssign({}, state, {questions: action.questions});
    default:
      return state;
  }
};
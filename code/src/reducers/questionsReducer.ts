import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'FETCHING_QUESTIONS':
    return objectAssign({}, state, {questions: action.questions});
    case 'POSTING_QUESTIONS':
    return objectAssign({}, state, {questions: action.questions});
    case "CONFIRM_QUESTIONS":
    return objectAssign({}, state, {confirmationData: action.confirmationData});
    case "AUTHENTICATE_USER":
    return objectAssign({}, state, {user: action.user});
    case "PASSWORD_RESET":
    return objectAssign({}, state, {user: action.user});
    case "POST_PAYMENT_DONE":
    return objectAssign({}, state, {paymentInfo: action.paymentInfo});
    default:
      return state;
  }
};
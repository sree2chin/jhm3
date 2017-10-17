import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'SUMBMITTED_PERSONAL_INFO':
    	return objectAssign({}, state, {products: action.products});
    case 'SUMBMITTED_PRODUCTS_INFO':
      return objectAssign({}, state, {plans: action.plans});
    case 'SUMBMITTED_PLANS_INFO':
      return objectAssign({}, state, {premiums: action.premiums});
    case "SETTING_PERSONS_INFO":
    	return objectAssign({}, state, {persons: action.persons});
    case "SUMBMITTED_SAVE_QUOTE":
      return objectAssign({}, state, {quoteResponse: action.persons});
    case "SUMBMITTED_EMAIL_INFO":
    	return objectAssign({}, state, {isSubmmitedEmailForm: action.isSubmmitedPlansForm});
    default:
      return state;
  }

};

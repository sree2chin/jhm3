import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'SUMBMITTED_PERSONAL_INFO':
    	return objectAssign({}, state, {isSubmmitedQuoteForm: action.isSubmmitedQuoteForm, products: action.products});
    case 'SUMBMITTED_PRODUCTS_INFO':
      return objectAssign({}, state, {isSubmmitedProductsForm: action.isSubmmitedProductsForm, plans: action.plans});
    case "SUMBMITTED_PLANS_INFO":
    	return objectAssign({}, state, {isSubmmitedPlansForm: action.isSubmmitedPlansForm});
    case "SUMBMITTED_EMAIL_INFO":
    	return objectAssign({}, state, {isSubmmitedEmailForm: action.isSubmmitedPlansForm});
    default:
      return state;
  }

};

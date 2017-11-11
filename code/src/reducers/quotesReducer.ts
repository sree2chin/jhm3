import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'SUMBMITTED_PERSONAL_INFO':
    	return objectAssign({}, state, {products: action.products, productValidations: action.productValidations, isProductFetchCallDone: true});
    case 'SUMBMITTED_PRODUCTS_INFO':
      return objectAssign({}, state, {plans: action.plans});
    case 'SUMBMITTED_PLANS_INFO':
      var premiums;
      if(state.premiums) {  
        premiums= JSON.parse(JSON.stringify(state.premiums));
      } else {
        premiums = action.premiums;
      }
       
      if(premiums[0] && action.premiums[0]) {
        premiums[0].input_data = action.premiums[0].input_data;
        if (action.premiums[0].plans_data && action.premiums[0].plans_data.ProductID) {
          premiums[0][action.premiums[0].plans_data.ProductID] = action.premiums[0].plans_data;
        }
      }
      if(premiums[1] && action.premiums[1]) {
        premiums[1].input_data = action.premiums[1].input_data;
        if (action.premiums[1].plans_data) {
          if (action.premiums[1].plans_data.ProductID) {
            premiums[1][action.premiums[1].plans_data.ProductID] = action.premiums[1].plans_data;
          }
        }
      }
      return objectAssign({}, state, {premiums: premiums});
    case "SETTING_PERSONS_INFO":
    	return objectAssign({}, state, {persons: action.persons});
    case "SETTING_TYPE_OF_SUBMISSION":
      return objectAssign({}, state, {typeOfSubmission: action.typeOfSubmission});
    case "OPEN_EDIT_PERSON_MODAL":
      return objectAssign({}, state, {showModalEditPerson: true, editablePerson: action.editablePerson, editablePersonIndex: action.editablePersonIndex});
    case "CLOSE_EDIT_PERSON_MODAL":
      return objectAssign({}, state, {showModalEditPerson: false, editablePerson: {});
    case "EDITED_PERSON":
      const person = JSON.parse(JSON.stringify(action.person));
      const persons = JSON.parse(JSON.stringify(state.persons));
      persons[parseInt(person["applicant"]) - 1 ] = person;
      return objectAssign({}, state, {editablePerson: person, persons: persons});
    case "SUMBMITTED_SAVE_QUOTE":
      return objectAssign({}, state, {quoteResponse: action.persons});
    case "SUMBMITTED_EMAIL_INFO":
    	return objectAssign({}, state, {isSubmmitedEmailForm: action.isSubmmitedPlansForm});
    default:
      return state;
  }

};

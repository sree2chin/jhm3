import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'SUMBMITTED_PERSONAL_INFO':
    	return objectAssign({}, state, {products: action.products, productValidations: action.productValidations});
    case 'SUMBMITTED_PRODUCTS_INFO':
      return objectAssign({}, state, {plans: action.plans});
    case 'SUMBMITTED_PLANS_INFO':
      return objectAssign({}, state, {premiums: action.premiums});
    case "SETTING_PERSONS_INFO":
    	return objectAssign({}, state, {persons: action.persons});
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

import objectAssign = require('object-assign');

export default (state: Array<any> = [], action) => {
  switch (action.type) {
    case 'NUMBER_OF_PERSONS_SELECTED':
    	return objectAssign({}, state, {noOfPersons: action.noOfPersons});
    default:
      return state;
  }
};

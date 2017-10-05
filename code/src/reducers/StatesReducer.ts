import objectAssign = require('object-assign');
import MemberEntity from "../api/memberEntity";

export default (state : Array<any> = [], action) => {
  switch (action.type) {
    case 'MEMBERS_ASSIGN':

      return [...action.members];

    default:
      return state;
  }

};


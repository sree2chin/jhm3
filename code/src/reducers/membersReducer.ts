import MemberEntity from "../api/memberEntity";

export default (state : Array<MemberEntity> = [], action) => {
  switch (action.type) {
    case 'MEMBERS_ASSIGN':

      return [...action.members];

    default:
      return state;
  }

};

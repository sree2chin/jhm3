
const intitalState = {
    collegesList: []
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case 'GET_COLLEGES_LIST':
      return {
        collegesList: action.payload.data
      };
    default:
      return state;
  }
};


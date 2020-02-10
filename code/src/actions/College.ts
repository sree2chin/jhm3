import CollegeApi from '../api/college-api';

export const getCollegesList = () => {
    return (dispatch) => {
		return CollegeApi.getCollegesList().then(data => {
			dispatch({
                type: 'GET_COLLEGES_LIST', 
                payload: data
            })
		})
	};
}

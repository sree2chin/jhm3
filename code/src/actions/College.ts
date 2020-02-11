import { getCollegesListApi } from '../api/college-api';
import axios from 'axios';

export const getCollegesList = () => {
    return (dispatch) => {
        return getCollegesListApi().then(data => {
			dispatch({
                type: 'GET_COLLEGES_LIST', 
                payload: data
            });
		}).catch(err => {
            console.log("handle this case")
        })
	};
}

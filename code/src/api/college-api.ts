import axios from 'axios';

export const getCollegesListApi = () => { 
    return axios.get('/v1/api/college');
}

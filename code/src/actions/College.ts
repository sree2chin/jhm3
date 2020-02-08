
export const getCollegesList = () => {
    return (dispatch) => {
        return dispatch({
            type: 'GET_COLLEGES_LIST'
        })
    }
}

import StatesApi from '../api/StatesApi';

function loadStates() {
	return function (dispatch) {
		return StatesApi.getStatesList().then(
			data => dispatch({
					type: 'FETCH_STATES_DONE'
					,states: data
				}))
		);
	};
}

export default loadStates;

import QuestionsApi from '../api/QuestionsApi';

function getQuestions() {
	return (dispatch) => {
		return QuestionsApi.get().then(
			data => dispatch({
				type: 'FETCHING_QUESTIONS', questions: data
			}));
	};
}

function postQuestions(data) {
	return (dispatch) => {
		return QuestionsApi.post(data).then(
			data => dispatch({
				type: 'POSTING_QUESTIONS', questions: data
			}));
	};
}

function confirmQuestions(data) {
	return (dispatch) => {
		return QuestionsApi.confirm(data).then(
			data => dispatch({
				type: 'CONFIRM_QUESTIONS', confirmationData: data
			}));
	};
}

function getFactorsearch(data) {
	return (dispatch) => {
		return QuestionsApi.getFactorsearch(data).then(
			data => dispatch({
				type: 'GET_FACTOR_SEARCH_OPTIONS', questions: data
			}));
	};
}

export {
	getQuestions,
	postQuestions,
	getFactorsearch,
	confirmQuestions
}

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

export {
	getQuestions,
	postQuestions
}

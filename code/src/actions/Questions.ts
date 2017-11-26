import QuestionsApi from '../api/QuestionsApi';

function getQuestions() {
	return (dispatch) => {
		return QuestionsApi.get().then(
			data => dispatch({
				type: 'FETCHING_QUESTIONS', questions: data
			}))
		);
	};
}

export {
	getQuestions
}

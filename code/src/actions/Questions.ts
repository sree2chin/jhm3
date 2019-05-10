import QuestionsApi from '../api/QuestionsApi';

function getQuestions(mergeObjWithQueryParams) {
	return (dispatch) => {
		return QuestionsApi.get(mergeObjWithQueryParams).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'FETCHING_QUESTIONS', questions: data
				}));
			}
	};
}

function postQuestions(data) {
	return (dispatch) => {
		return QuestionsApi.post(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'POSTING_QUESTIONS', questions: data
				}));
			}
	};
}

function confirmQuestions(data) {
	return (dispatch) => {
		return QuestionsApi.confirm(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'CONFIRM_QUESTIONS', confirmationData: data
				}));
			}
	};
}

function makePayment(data) {
	return (dispatch) => {
		return QuestionsApi.makePayment(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'MADE_PAYMENT', paymentData: data
				}));
			}
	};
}

function authenticateUser(data) {
	return (dispatch) => {
		return QuestionsApi.authenticateUser(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'AUTHENTICATE_USER', user: data
				}));
			}
	};
}

function changePassword(data) {
	return (dispatch) => {
		return QuestionsApi.changePassword(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'PASSWORD_RESET', user: data
				}));
			}
	};
}

function sendResetLink(data) {
	return (dispatch) => {
		return QuestionsApi.sendResetLink(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'RESEND_LINK_SENT', resendData: data
				}));
			}
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

function postPayment(data) {
	return (dispatch) => {
		return QuestionsApi.postPayment(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'POST_PAYMENT_DONE', paymentInfo: data
				}));
			}
	};
}

function getUnSubscribeOptions(data) {
	return (dispatch) => {
		return QuestionsApi.getUnSubscribeOptions(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'GET_UNSUBSCRIBITIONS_OPTIONS', unsubscribeOptions: data.data
				}));
			}
	};
}

function postUnSubscribeOptions(data) {
	return (dispatch) => {
		return QuestionsApi.postUnSubscribeOptions(data).then(
			data => {
				window.initialTagManager = data.tag_manager;
				return dispatch({
					type: 'POST_UNSUBSCRIBITIONS_OPTIONS', thanksMessage: data.message
				}));
			}
	}
}

function setGoogleQuestionsAnswersMap(data) {
	return (dispatch) => {
		return return dispatch({
			type: 'SET_GOOGLE_QUESTIONS_ANSWER_MAP', googlePlacesQuestionsAnswersMap: data
		});
	};
}

export {
	getQuestions,
	postQuestions,
	getFactorsearch,
	confirmQuestions,
	authenticateUser,
	changePassword,
	postPayment,
	makePayment,
	sendResetLink,
	getUnSubscribeOptions,
	postUnSubscribeOptions,
	setGoogleQuestionsAnswersMap,
}

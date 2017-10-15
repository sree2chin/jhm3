import SubmitQuoteApi from '../api/QuotesApi';

function submitQuoteForm(postData) {
	return (dispatch) => {
		return SubmitQuoteApi.submit(postData).then(
			data => dispatch({
				type: 'SUMBMITTED_PERSONAL_INFO', isSubmmitedQuoteForm: true, products: data.data.applicants
			}))
		);
	};
}

function setPersonsData(persons) {
	return (dispatch) => {
		return dispatch({
				type: 'SETTING_PERSONS_INFO',  persons: persons
			})
	};
}

function submitProductsForm(postData) {
	return (dispatch) => {
		return SubmitQuoteApi.submitProductsForm(postData).then(
			data => dispatch({
				type: 'SUMBMITTED_PRODUCTS_INFO', isSubmmitedProductsForm: true, plans: data.data.applicants
			}))
		);
	};
}

function submitPlansForm(postData) {
	return (dispatch) => {
		SubmitQuoteApi.plansSubmit(postData).then(
			data => dispatch({
				type: 'SUMBMITTED_PLANS_INFO', isSubmmitedPlansForm: data
			}))
		);
	};
}

function submitEmailForm(postData) {
	return (dispatch) => {
		SubmitQuoteApi.emailSubmit(postData).then(
			data => dispatch({
				type: 'SUMBMITTED_EMAIL_INFO', isSubmmitedEmailForm: data
			}))
		);
	};
}



export {
	submitQuoteForm,
	submitPlansForm,
	submitEmailForm,
	submitProductsForm,
	setPersonsData
}

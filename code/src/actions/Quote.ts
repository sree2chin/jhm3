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

function openEditPersonModal(person, personIndex) {
	return (dispatch) => {
		return dispatch({
				type: 'OPEN_EDIT_PERSON_MODAL',
				editablePerson: person,
				editablePersonIndex: personIndex
			})
	};
}

function closeEditPersonModal() {
	return (dispatch) => {
		return dispatch({
				type: 'CLOSE_EDIT_PERSON_MODAL'
			})
	};
}

function handleEditChange(person) {
	return (dispatch) => {
		return dispatch({
				type: 'EDITED_PERSON',
				person: person
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
		return SubmitQuoteApi.plansSubmit(postData).then(
			data => dispatch({
				type: 'SUMBMITTED_PLANS_INFO', premiums: data.data.applicants
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

function saveQuoteForm(postData) {
	return (dispatch) => {
		return SubmitQuoteApi.saveQuoteForm(postData).then(
			data => dispatch({
				type: 'SUMBMITTED_SAVE_QUOTE', quoteResponse: data
			}))
		);
	};
}


export {
	submitQuoteForm,
	submitPlansForm,
	submitEmailForm,
	submitProductsForm,
	setPersonsData,
	saveQuoteForm,
	openEditPersonModal,
	closeEditPersonModal,
	handleEditChange
}

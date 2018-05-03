import SubmitQuoteApi from '../api/QuotesApi';

function submitQuoteForm(postData) {
	return (dispatch) => {
		return SubmitQuoteApi.submit(postData).then(
			data => {
				if (data && data.data && data.data.applicants) {
					dispatch({
						type: 'SUMBMITTED_PERSONAL_INFO', products: data.data.applicants,
						productValidations: data.data.validations,
						is_agent: data.extra_params && data.extra_params.is_agent==1 ? true : false
					});
				} else {
					dispatch({
						type: 'SUMBMITTED_PERSONAL_INFO', products: data,
						is_agent: data.extra_params && data.extra_params.is_agent==1 ? true : false
					});
				}
		})
	};
}

function setPersonsData(persons) {
	return (dispatch) => {
		return dispatch({
				type: 'SETTING_PERSONS_INFO',  persons: persons
			})
	};
}

function setTypeOfSubmission(typeOfSubmission) {
	return (dispatch) => {
		return dispatch({
				type: 'SETTING_TYPE_OF_SUBMISSION',  typeOfSubmission: typeOfSubmission
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

function closeEditPersonModal() : any {
	return (dispatch) => {
		return dispatch({
				type: 'CLOSE_EDIT_PERSON_MODAL'
			})
	};
}

function handleEditChange(person) : any {
	return (dispatch) => {
		return dispatch({
				type: 'EDITED_PERSON',
				person: person
			})
	};
}



function submitProductsForm(postData) : any {
	return (dispatch) => {
		return SubmitQuoteApi.submitProductsForm(postData).then(
			data => {
			if (data && data.data && data.data.applicants) {
				dispatch({
					type: 'SUMBMITTED_PRODUCTS_INFO', isSubmmitedProductsForm: true, plans: data.data.applicants
				});
			} else {
				dispatch({
					type: 'SUMBMITTED_PRODUCTS_INFO',
					plans: data
				});
			}
		})
	};
}

function submitPlansForm(postData) : any {
	return (dispatch) => {
		return SubmitQuoteApi.plansSubmit(postData).then(
			data => {
				if (data && data.data && data.data.applicants) {
					dispatch({
						type: 'SUMBMITTED_PLANS_INFO',
						premiums: data.data.applicants
					})
				} else {
					dispatch({
						type: 'SUMBMITTED_PLANS_INFO',
						premiums: data
					});
				}
		})
	};
}

function saveQuoteForm(postData) : any{
	return (dispatch) => {
		return SubmitQuoteApi.saveQuoteForm(postData).then(
			data => {
				if (data && data.data && data.data.applicants) {
					dispatch({
						type: 'SUMBMITTED_SAVE_QUOTE', quoteResponse: data
					});
				} else {
					dispatch({
						type: 'SUMBMITTED_SAVE_QUOTE',
						quoteResponse: data
					});
				}
		})
	};
}


export {
	submitQuoteForm,
	submitPlansForm,
	submitProductsForm,
	setPersonsData,
	saveQuoteForm,
	openEditPersonModal,
	closeEditPersonModal,
	handleEditChange,
	setTypeOfSubmission
}

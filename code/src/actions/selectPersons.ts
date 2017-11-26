import SubmitQuoteApi from '../api/QuotesApi';

function selectNoOfPersons (noOfPersons) {
	return (dispatch) => {
		dispatch({
			type: 'NUMBER_OF_PERSONS_SELECTED', noOfPersons: noOfPersons
		}));
	};
};

export {
	selectNoOfPersons
}
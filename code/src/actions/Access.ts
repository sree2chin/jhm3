import AccessApi from '../api/AccessApi';

function getQuoteAccess(query, cb) : any{
	return AccessApi.getQuoteAccess(query).then(
		data => {
			cb(data);
			if (data && data.data && data.data.phone_number) {
				reduxDispatch({
					type: 'GOT_PHONE_NUMBER_DETAILS', 
					phoneNumberDetails: data.data.phone_number
				});
			} else {
				reduxDispatch({
					type: 'ERROR_IN_FETCHING_PHONE_NUMBER_DETAILS',
					phoneNumberDetails: null
				});
			}
	});
}


export {
	getQuoteAccess,
}
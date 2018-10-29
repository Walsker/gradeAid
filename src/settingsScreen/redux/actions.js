// Redux imports
import * as actionTypes from './actionTypes';

// --------------------------------------------------------------------------------------
// An action creator for erasing all the app data
// --------------------------------------------------------------------------------------
export const eraseAppData = () =>
{
	console.log("ELKJASD")
	return {
		type: actionTypes.ERASE_APP_DATA,
		payload: {}
	};
};
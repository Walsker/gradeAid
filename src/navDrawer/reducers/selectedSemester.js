import {SELECT_SEMESTER} from '../actions';

export default (prevState = -1, action) =>
{
	switch(action.type)
	{
		// ------------------------------------------------------------------------------
		// CASE: a new semester has been selected
		// PAYLOAD: an integer representing the ID of the selected semester
		// ------------------------------------------------------------------------------
		case SELECT_SEMESTER:
			return action.payload;

		default:
			return prevState;
	}
};
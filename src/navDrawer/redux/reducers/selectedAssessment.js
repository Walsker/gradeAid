import {SELECT_ASSESSMENT} from '../actionTypes';

export default (prevState = 0, action) =>
{
	switch(action.type)
	{
		// ------------------------------------------------------------------------------
		// CASE: a new assessment has been selected
		// PAYLOAD: an integer representing the ID of the selected assessment
		// ------------------------------------------------------------------------------
		case SELECT_ASSESSMENT:
			return action.payload;

		default:
			return prevState;
	}
};
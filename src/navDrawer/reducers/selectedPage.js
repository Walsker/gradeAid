import {SELECT_PAGE} from '../actions';

export default (prevState = 0, action) =>
{
	switch(action.type)
	{
		// ------------------------------------------------------------------------------
		// CASE: a new course has been selected
		// PAYLOAD: an integer representing the ID of the selected course
		// ------------------------------------------------------------------------------
		case SELECT_PAGE:
			return action.payload;

		default:
			return prevState;
	}
};
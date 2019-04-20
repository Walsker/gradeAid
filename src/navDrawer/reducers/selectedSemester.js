import {SELECT_SEMESTER} from '../actions';
import {ERASE_USER_DATA} from 'gradeAid/src/userData/actions';

const INITIAL_STATE = -1;

export default (prevState = INITIAL_STATE, action) =>
{
	switch(action.type)
	{
		// --------------------------------------------------------------------------------------
		// CASE: User data is being purged
		// PAYLOAD: none.
		// --------------------------------------------------------------------------------------
		case ERASE_USER_DATA:
			return INITIAL_STATE;

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
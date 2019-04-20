import {SELECT_COURSE} from '../actions';
import {ERASE_USER_DATA} from 'gradeAid/src/userData/actions';

const INITIAL_STATE = 0;

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
		// CASE: a new course has been selected
		// PAYLOAD: an integer representing the ID of the selected course
		// ------------------------------------------------------------------------------
		case SELECT_COURSE:
			return action.payload;

		default:
			return prevState;
	}
};
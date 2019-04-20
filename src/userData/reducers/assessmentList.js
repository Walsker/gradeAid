// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the assessments in the app
// It sorts all the assessments by giving them all a unique ID
//
// Below is the structure for this portion of the state
// assessmentList:
// {
//		[id]: {_id: int, name: string, grade: float, weight: int}
//		...
// }
// --------------------------------------------------------------------------------------

import {ERASE_USER_DATA, CREATE_ASSESSMENT, DELETE_ASSESSMENT, EDIT_ASSESSMENT} from '../actions';

const INITIAL_STATE = {};

export default (prevState = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		// --------------------------------------------------------------------------------------
		// CASE: User data is being purged
		// PAYLOAD: none.
		// --------------------------------------------------------------------------------------
		case ERASE_USER_DATA:
			return INITIAL_STATE;

		// ------------------------------------------------------------------------------
		// CASE: a new assessment is being created
		// PAYLOAD: {type: int, name: string, grade: float}
		// ------------------------------------------------------------------------------
		case CREATE_ASSESSMENT:
			return {
				...prevState,
				[action.payload._id]: action.payload,
			};

		// ------------------------------------------------------------------------------
		// CASE: an existing assessment is being modified
		// PAYLOAD: {id, newProps}
		//      id: the unique id of the assessment to be modified
		//      newProps: an object of the new values of the properties being changed
		// ------------------------------------------------------------------------------
		case EDIT_ASSESSMENT:
			let {id, newProps} = action.payload;

			// Making the changes to the assessment object
			let modifiedAssessment = Object.assign({}, prevState[id], newProps);

			return {
				...prevState,
				[id]: modifiedAssessment
			};

		default:
			return prevState;

		// ------------------------------------------------------------------------------
		// CASE: an assessment is being deleted from the app
		// PAYLOAD: int, the ID of the assessment to be removed
		// ------------------------------------------------------------------------------
		case DELETE_ASSESSMENT:

			let assessList = {};
			for (id in prevState)
			{
				if (id != action.payload)
					assessList[id] = {...prevState[id]};
			}

			return assessList;
	}
};
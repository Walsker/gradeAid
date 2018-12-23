// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the assessments in the app
// It sorts all the assessments by giving them all a unique ID
//
// Below is the structure for this portion of the state
// assessmentList:
// {
//      [id]: {type: int, name: string, courseID: int, grade: float}
//		...
// }
// --------------------------------------------------------------------------------------

import {CLEAN_ASSESS_LIST, CREATE_ASSESSMENT, DELETE_ASSESSMENT, EDIT_ASSESSMENT} from '../actionTypes';

export default (prevState = {}, action) =>
{
	switch (action.type)
	{
		// ------------------------------------------------------------------------------
		// CASE: the assessment list is being purged of all assessments whose parent
		//      course no longer exists
		// PAYLOAD: a list of all the assessment IDs for assessments that no longer
		//			belong to a course
		// ------------------------------------------------------------------------------
		case CLEAN_ASSESS_LIST:

			var newAssessList = {};
			for (id in prevState)
			{
				if (!(id in action.payload))
				{
					newAssessList = Object.assign(newAssessList, {[id]: prevState[id]});
				}
			}

			return newAssessList;

		// ------------------------------------------------------------------------------
		// CASE: a new assessment is being created
		// PAYLOAD: an assessment object in the form
		//      {type: int, name: string, courseID: int, grade: float}
		// ------------------------------------------------------------------------------
		case CREATE_ASSESSMENT:

			// Finding an unused ID
			var newID = 0;
			while (true)
			{
				if (prevState[newID] == undefined)
					break;
				else
					newID++;
			}

			return {
				...prevState,
				[newID]: action.payload,
			};

		// ------------------------------------------------------------------------------
		// CASE: an assessment is being deleted from the app
		// PAYLOAD: int, the ID of the assessment to be removed
		// ------------------------------------------------------------------------------
		case DELETE_ASSESSMENT:

			var assessList = {};
			for (id in prevState)
			{
				if (id != action.payload)
					assessList[id] = {...prevState[id]};
			}

			return assessList;

		// ------------------------------------------------------------------------------
		// CASE: an existing assessment is being modified
		// PAYLOAD: an object in the form
		//      {id, newProps}
		//      id: the unique id of the assessment to be modified
		//      newProps: an object of the new values of the properties being changed
		// ------------------------------------------------------------------------------
		case EDIT_ASSESSMENT:

			// Copying the previous list of assessments as to not modify it
			var assessList = {...prevState};
			var oldAssessment = assessList[action.payload.id];

			// Making the changes to the assessment object
			var modifiedAssessment = Object.assign({}, oldAssessment, action.payload.newProps);

			return {
				...prevState,
				[action.payload.id]: modifiedAssessment
			};

		default:
			return prevState
	}
};
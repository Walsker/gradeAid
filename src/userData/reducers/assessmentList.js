// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the assessments in the app
// It sorts all the assessments by giving them all a unique ID
//
// Below is the structure for this portion of the state
// assessmentList:
// {
//      [id]: {type: int, name: string, courseID: int, grade: float}
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
        // PAYLOAD: an object which contains the IDs of the deleted assessments as keys,
        //          all with a value of undefined
		//          {
		//              [id]: undefined
		//          }
		// ------------------------------------------------------------------------------
		case CLEAN_ASSESS_LIST:

			return {
				...prevState,
				...action.payload
			};

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

            return {
                ...prevState,
                [action.payload]: undefined
            };

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
            var modifiedAssessment = Object.assign(oldAssessment, action.payload.newProps);

            return {
                ...prevState,
                [action.payload.id]: modifiedAssessment
            };
            
        default:
            return prevState
    }
};
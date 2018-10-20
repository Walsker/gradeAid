// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the assessments in the app
// It sorts all the assessments by giving them all a unique ID
//
// Below is the structure for this portion of the state
// allAssessments:
// {
//      [id]: {type: int, name: string, grade: float}
// }
// --------------------------------------------------------------------------------------

import {ADD_ASSESSMENT, REMOVE_ASSESSMENT, EDIT_ASSESSMENT} from '../actionTypes';

export default (prevState = {}, action) =>
{
    switch(action.type)
    {
        // ------------------------------------------------------------------------------
        // CASE: a new assessment is being created
        // PAYLOAD: an assessment object in the form
        //      {type: int, name: string, grade: float}
        // ------------------------------------------------------------------------------
        case ADD_ASSESSMENT:

            // Finding an unused ID
            var newID = 0;
            while (true)
            {
                // Checking if there exists an assessment with the ID newID
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
        // CASE: an assessment is being removed from the app
        // PAYLOAD: int, the ID of the assessment to be removed
        // ------------------------------------------------------------------------------
        case REMOVE_ASSESSMENT:

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

            // Not making any changes
            return prevState
    }
};
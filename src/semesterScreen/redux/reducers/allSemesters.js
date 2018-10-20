// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the semesters in the app
// It sorts all the semesters by giving them all a unique ID
//
// Below is the structure for this portion of the state
// allSemesters:
// {
//      getAverage: (semesterID),
//      [id]: {name: string, courses: int[]},
// }
//  where "courses" is a list of course IDs
// --------------------------------------------------------------------------------------

import {ADD_SEMESTER, REMOVE_SEMESTER, EDIT_SEMESTER} from '../actionTypes';

export default (prevState = {getAverage}, action) =>
{
    switch(action.type)
    {
        // ------------------------------------------------------------------------------
        // CASE: a new semester is being created
        // PAYLOAD: a semester object in the form
        //      {name: string, courses: int[]}
        // ------------------------------------------------------------------------------
        case ADD_SEMESTER:

            // Finding an unused ID
            var newID = 0;
            while (true)
            {
                // Checking if there exists a semester with the ID newID
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
        // CASE: a semester is being removed from the app
        // PAYLOAD: int, the ID of the semester to be removed
        // ------------------------------------------------------------------------------
        case REMOVE_SEMESTER:

            return {
                ...prevState,
                [action.payload]: undefined
            };

        // ------------------------------------------------------------------------------
        // CASE: an existing semester is being modified
        // PAYLOAD: an object in the form
        //      {id, newProps}
        //      id: the unique id of the semester to be modified
        //      newProps: an object of the new values of the properties being changed
        // ------------------------------------------------------------------------------
        case EDIT_SEMESTER:

            // Copying the previous list of semesters as to not modify it
            var semesterList = {...prevState};
            var oldSemester = semesterList[action.payload.id];

            // Making the changes to the semester object
            var modifiedSemester = Object.assign(oldSemester, action.payload.newProps);

            return {
                ...prevState,
                [action.payload.id]: modifiedSemester
            };
            
        default:

            // Not making any changes
            return prevState
    }
};
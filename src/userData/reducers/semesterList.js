// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the semesters in the app
// It sorts all the semesters by giving them all a unique ID
//
// Below is the structure for this portion of the state
// semesterList:
// {
//      [id]: {name: string},
// }
// --------------------------------------------------------------------------------------

import {CREATE_SEMESTER, DELETE_SEMESTER, EDIT_SEMESTER} from '../actionTypes';

export default (prevState = {}, action) =>
{
    switch (action.type)
    {
        // ------------------------------------------------------------------------------
        // CASE: a new semester is being created
        // PAYLOAD: a semester object in the form
        //      {name: string}
        // ------------------------------------------------------------------------------
        case CREATE_SEMESTER:

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
        // CASE: a semester is being removed from the app
        // PAYLOAD: int, the ID of the semester to be removed
        // ------------------------------------------------------------------------------
        case DELETE_SEMESTER:

        // TODO: fix case where there are no semesters left
            var semesterList = {};
            for (id in prevState)
            {
                if (id != action.payload)
                {
                    semesterList = Object.assign(semesterList, {[id]: prevState[id]});
                }
            }
            console.log(semesterList);
            return semesterList;

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
            return prevState
    }
};
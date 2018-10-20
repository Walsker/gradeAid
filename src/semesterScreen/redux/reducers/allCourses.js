// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the courses in the app
// It sorts all the courses by giving them all a unique ID, which semesters will then refer to.
//
// Below is the structure for this portion of the state
// allCourses:
// {
//      [id]: {name: string, newCourse: bool, assessments: int[]}
// }
//  where "assessments" is a list of assessment IDs
// --------------------------------------------------------------------------------------

import {ADD_COURSE, REMOVE_COURSE, EDIT_COURSE} from '../actionTypes';

export default (prevState = {}, action) =>
{
    switch(action.type)
    {
        // ------------------------------------------------------------------------------
        // CASE: a course is being added to the app
        // PAYLOAD: a course object in the form
        //      {name: string, newCourse: bool, breakdown: float[], assessments: int[]}
        // ------------------------------------------------------------------------------
        case ADD_COURSE:

            // Finding an unused ID
            var newID = 0;
            while (true)
            {
                // Checking if there exists a course with the ID newID
                if (prevState[newID] == undefined)
                    break;
                else
                    newID++;
            }

            return {
                ...prevState,
                [newID]: action.payload
            };

        // ------------------------------------------------------------------------------
        // CASE: a course is being removed from the app
        // PAYLOAD: int, the ID of the course to be removed
        // ------------------------------------------------------------------------------
        case REMOVE_COURSE:

            return {
                ...prevState,
                [action.payload]: undefined
            };

        // ------------------------------------------------------------------------------
        // CASE: an existing course is being modified
        // PAYLOAD: an object in the form
        //      {id, newProps}
        //      id: the unique id of the course to be modified
        //      newProps: an object of the new values of the properties being changed
        // ------------------------------------------------------------------------------
        case EDIT_COURSE:

            // Copying the previous list of courses as to not modify it
            var courseList = {...prevState};
            var oldCourse = courseList[action.payload.id];

            // Making the changes to the course object
            var modifiedCourse = Object.assign(oldCourse, action.payload.newProps);

            return {
                ...prevState,
                [action.payload.id]: modifiedCourse
            };

        default:
            // Not making any changes
            return prevState
    }
};
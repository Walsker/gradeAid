import {NEW_SEMESTER, RENAME_SEMESTER, NEW_COURSE, INPUT_GRADE} from '../actionTypes';

export default (prevState = [], action) =>
{
    switch(action.type)
    {
        // --------------------------------------------------------------------
        // SEMESTER REDUCERS
        // --------------------------------------------------------------------

        // CASE: adding a semester to the app
        case NEW_SEMESTER:

            // var stateClone = prevState.slice();
            // Copying the previous semesters object as to not modify it
            var semestersClone = jQuery.extend(true, [], prevState)

            // Adding the new semester to the semesters clone
            semestersClone.splice(prevState.length - 1, 0, action.payload);

            // Returning the updated semesters object
            return semestersClone;
        
        // CASE: an existing semester is being renamed
        case RENAME_SEMESTER:
            // var newList = prevState.slice();
            // Copying the previous semesters object as to not modify it
            var semestersClone = jQuery.extend(true, [], prevState)

            // Searching through all the semesters
            for (var semester in semestersClone)
            {
                // Checking if this is the semester whose name is being changed
                if (semestersClone[semester].name == action.payload.oldSemester.name)
                {
                    // Replacing the old semester with the new semester
                    semestersClone[semester] = action.payload.newSemester;
                }
            }
            
            // Returning the updated semesters object
            return semestersClone;

        // --------------------------------------------------------------------
        // COURSE REDUCERS
        // --------------------------------------------------------------------

        // CASE: a new course is created or a course is being replaced
        case NEW_COURSE:
        case INPUT_GRADE:

            // var tempList = prevState.slice();
            
            // Copying the previous semesters object as to not modify it
            var semestersClone = jQuery.extend(true, [], prevState)

            // Searching through all the semesters
            for (var semester in semestersClone)
            {
                // Checking if this is the semesters whose courses are being modified
                if (action.payload.name == semestersClone[semester].name)
                {
                    // Replacing the old semester with the new semester
                    semestersClone[semester] = action.payload;
                }
            }

            // Returning the updated semesters object
            return semestersClone;

        default:
            // Not making any changes
            return prevState
    }
};
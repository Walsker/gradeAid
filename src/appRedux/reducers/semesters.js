import {NEW_SEMESTER, LOAD_SEMESTER_LIST, RENAME_SEMESTER, NEW_COURSE, INPUT_GRADE} from '../actionTypes';

export default (prevState = [], action) =>
{
    switch(action.type)
    {
        // Semester reducers
        case NEW_SEMESTER:
            var newList = prevState.slice();
            newList.push(action.payload);

            return newList;

        case LOAD_SEMESTER_LIST:
            return action.payload;
        
        case RENAME_SEMESTER:
            var newList = prevState.slice();

            for (i in newList)
            {
                if (newList[i].name == action.payload.oldSemester.name)
                {
                    newList[i] = action.payload.newSemester;
                }
            }

            return newList;

        // Course reducers
        case NEW_COURSE:
        case INPUT_GRADE:
            var tempList = prevState.slice();
            
            for (i in tempList)
            {
                // Sifting through the semesters and replacing it with the updated one
                if (action.payload.name == tempList[i].name)
                {
                    tempList[i] = action.payload;
                }
            }

            return tempList;

        default:
            return prevState
    }
};
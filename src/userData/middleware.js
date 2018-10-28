import * as actionTypes from './actionTypes';
import {editCourse, editSemester} from './actions';

export const calculateAverages = store => next => action =>
{
    switch(action.type)
    {
        case actionTypes.CREATE_ASSESSMENT:

            var result = next(action);
            var courseID = action.payload.courseID;
            var assessList = store.assessmentList;

            var gradeSum = 0;
            var counter = 0;
            for (id in assessList)
            {
                if (assessList[id].courseID == courseID)
                {
                    counter++;
                    gradeSum += assessList[id].grade;
                }
            }

            var courseAverage = gradeSum / counter;
            next(editCourse(courseID, {average: courseAverage}));

            return result;

        case actionTypes.DELETE_ASSESSMENT:
        case actionTypes.EDIT_ASSESSMENT:

            // Do courses
        case actionTypes.CREATE_COURSE:
        case actionTypes.DELETE_COURSE:
        case actionTypes.EDIT_COURSE:

            // Do semesters
    }
}
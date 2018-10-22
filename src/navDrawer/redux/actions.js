import * as actionTypes from './actionTypes';

export const selectSemester = (selectedSemesterID) =>
{
    return {
        type: actionTypes.SELECT_SEMESTER,
        payload: selectedSemesterID
    };
}
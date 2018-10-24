import * as actionTypes from './actionTypes';

export const selectSemester = (selectedSemesterID) =>
{
    return {
        type: actionTypes.SELECT_SEMESTER,
        payload: selectedSemesterID
    };
}

export const upSemesterCount = () =>
{
    return {
        type: actionTypes.UP_COUNT,
        payload: null
    };
}
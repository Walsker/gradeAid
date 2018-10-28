import * as actionTypes from './actionTypes';

export const selectCourse = (selectedCourseID) =>
{
	return {
		type: actionTypes.SELECT_COURSE,
		payload: selectedCourseID
	};
}

export const selectAssessment = (selectedAssessID) =>
{
	return {
		type: actionTypes.SELECT_ASSESSMENT,
		payload: selectedAssessID
	};
}

export const selectSemester = (selectedSemesterID) =>
{
	return {
		type: actionTypes.SELECT_SEMESTER,
		payload: selectedSemesterID
	};
}

export const upOrderID = () =>
{
	return {
		type: actionTypes.UP_COUNT,
		payload: null
	};
}
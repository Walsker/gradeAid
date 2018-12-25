// Redux imports
import * as actionTypes from './actionTypes';

// --------------------------------------------------------------------------------------
// SEMESTER ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a semeseter and adding it to the app
// semesterName: the name of the new semester
// --------------------------------------------------------------------------------------
export const createSemester = (semesterName, orderID) =>
{
	return {
		type: actionTypes.CREATE_SEMESTER,
		payload: {name: semesterName, average: 'X', orderID}
	};
};

// --------------------------------------------------------------------------------------
// An action creator for deleting a semester from the app
// id: unique integer value of the semester to be deleted
// --------------------------------------------------------------------------------------
export const deleteSemester = (id) =>
{
	return {
		type: actionTypes.DELETE_SEMESTER,
		payload: id
	};
};

// --------------------------------------------------------------------------------------
// An action creator for editing an existing semester
// id: unique integer value of the semester to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editSemester = (id, newProps) =>
{
	return {
		type: actionTypes.EDIT_SEMESTER,
		payload: {id, newProps}
	};
};

// --------------------------------------------------------------------------------------
// COURSE ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a course
// name: the name of the new course
// markBreakdown: A list of floats corresponding to the weight of each assessment type
//                  in the course. The indecies in this list correspond to the constants
//                  in assessmentTypes.js.
// --------------------------------------------------------------------------------------
export const createCourse = (name, semesterID, markBreakdown) =>
{
	return {
		type: actionTypes.CREATE_COURSE,
		payload:
		{
			name,
			semesterID,
			average: -1,
			completion: 0,
			breakdown: markBreakdown
		}
	};
};

// --------------------------------------------------------------------------------------
// An action creator for deleting a course from the app
// id: unique integer value of the course to be deleted
// --------------------------------------------------------------------------------------
export const deleteCourse = (id) =>
{
	return {
		type: actionTypes.DELETE_COURSE,
		payload: id
	};
};

// --------------------------------------------------------------------------------------
// An action creator for editing an existing course
// id: unique integer value of the course to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editCourse = (id, newProps) =>
{
	return {
		type: actionTypes.EDIT_COURSE,
		payload: {id, newProps}
	};
};

// --------------------------------------------------------------------------------------
// ASSESSMENT ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a new assessment and adding it to the app
// type: an integer that corresponds to the assessmentTypes in assessmentTypes.js
// name: the name of the assessment, defaults to the form "[type] [number]"
//      (i.e. Assignment 5), however a custom name can be provided
// grade: a float for the grade inputted by the user
// weight: a float for the weight inputted by the user
// --------------------------------------------------------------------------------------
export const createAssessment = (type, name, courseID, grade, weight) =>
{
	return {
		type: actionTypes.CREATE_ASSESSMENT,
		payload: {type, name, courseID, grade, weight}
	};
};

// --------------------------------------------------------------------------------------
// An action creator for deleting an assessment from the app
// id: the unique ID of the course being deleted
// --------------------------------------------------------------------------------------
export const deleteAssessment = (id) =>
{
	return {
		type: actionTypes.DELETE_ASSESSMENT,
		payload: id
	};
};

// --------------------------------------------------------------------------------------
// An action creator for editing an existing assessment (and in turn inputting a grade)
// id: unique integer value of the assessment to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editAssessment = (id, newProps) =>
{
	return {
		type: actionTypes.EDIT_ASSESSMENT,
		payload: {id, newProps}
	};
};
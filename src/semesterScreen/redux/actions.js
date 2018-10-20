// Redux imports
import * as actionTypes from './actionTypes';

// --------------------------------------------------------------------------------------
// SEMESTER ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for adding a semester to the smester list
// semesterName: the name of the new semester
// --------------------------------------------------------------------------------------
export const addSemester = (semesterName) =>
{
    return {
        type: actionTypes.ADD_SEMESTER,
        payload: {name: semesterName, courses: []}
    };
};

// --------------------------------------------------------------------------------------
// An action creator for removing a semester from the semester list
// id: unique integer value of the semester to be deleted
// --------------------------------------------------------------------------------------
export const removeSemester = (id) => 
{
    return {
        type: actionTypes.REMOVE_SEMESTER,
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
// An action creator for adding a course to a semester
// name: the name of the new course
// markBreakdown: A list of floats corresponding to the weight of each assessment type
//                  in the course. The indecies in this list correspond to the constants
//                  in assessmentTypes.js.
// --------------------------------------------------------------------------------------
export const addCourse = (name, markBreakdown) =>
{
    return {
        type: actionTypes.ADD_COURSE,
        payload: 
        {
            name,
            newCourse: true,
            breakdown: markBreakdown,
            aassessments: []
        }
    };
};

// --------------------------------------------------------------------------------------
// An action creator for removing a course from the course list
// id: unique integer value of the course to be deleted
// --------------------------------------------------------------------------------------
export const removeCourse = (id) => 
{
    return {
        type: actionTypes.REMOVE_COURSE,
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
// An action creator for adding a new assessment to a course
// type: an integer that corresponds to the assessmentTypes in assessmentTypes.js
// name: the name of the assessment, defaults to the form "[type] [number]"
//      (i.e. Assignment 5), however a custom name can be provided 
// grade: an float for the grade inputted by the user
// --------------------------------------------------------------------------------------
export const addAssessment = (type, name, grade) =>
{
    return {
        type: actionTypes.ADD_ASSESSMENT,
        payload: {type, name, grade}
    };
};

// --------------------------------------------------------------------------------------
// An action creator for removing an assessment from a course
// id: the unique ID of the course being deleted
// --------------------------------------------------------------------------------------
export const removeAssessment = (id) =>
{
    return {
        type: actionTypes.REMOVE_ASSESSMENT,
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
        type: actionTypes.EDIT_COURSE,
        payload: {id, newProps}
    };
};
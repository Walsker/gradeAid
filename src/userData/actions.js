// Redux imports
import * as actionTypes from './actionTypes';

// --------------------------------------------------------------------------------------
// GENERAL ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// Two action creators for removing courses and assessments that no longer belong to a 
//  semester or course, respectively.
// semesters: the semesterList portion of the state
// courses: the courseList portion of the state
// assessments: the assessmentList portion of the state
// --------------------------------------------------------------------------------------
export const cleanCourses = (semesters, courses) =>
{
    // Clearning the courses list
    var semesterlessCourses = {};
    for (i in courses)
    {
        // Checking if this course belongs to a semester
        if (!(courses[i].semesterID in semesters))
            semesterlessCourses = Object.assign(semesterlessCourses, {[i]: undefined});
    }

    return {
        type: actionTypes.CLEAN_COURSE_LIST,
        payload: semesterlessCourses
    };
}
export const cleanAssessments = (courses, assessments) =>
{
    // Cleaning the assessments list
    var courselessAssessments = {};
    for (i in assessments)
    {
        // Checking if this assessment belongs to a course
        if (!(assessments[i].courseID in courses))
            courselessAssessments = Object.assign(courselessAssessments, {[i]: undefined});
    }

    return {
        type: actionTypes.CLEAN_ASSESS_LIST,
        payload: courselessAssessments
    };
}

// --------------------------------------------------------------------------------------
// SEMESTER ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a semeseter and adding it to the app
// semesterName: the name of the new semester
// --------------------------------------------------------------------------------------
export const createSemester = (semesterName) =>
{
    return {
        type: actionTypes.CREATE_SEMESTER,
        payload: {name: semesterName}
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
            newCourse: true,
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
// grade: an float for the grade inputted by the user
// --------------------------------------------------------------------------------------
export const createAssessment = (type, name, courseID, grade) =>
{
    return {
        type: actionTypes.CREATE_ASSESSMENT,
        payload: {type, name, courseID, grade}
    };
};

// --------------------------------------------------------------------------------------
// An action creator for deleting an assessment from the app
// id: the unique ID of the course being deleted
// --------------------------------------------------------------------------------------
export const deleteAssessment = (id) =>
{
    // TODO: removeAssessFromCourse(courseID, assessmentID)
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
        type: actionTypes.EDIT_COURSE,
        payload: {id, newProps}
    };
};
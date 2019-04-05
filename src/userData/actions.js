// Redux imports
export const CREATE_SEMESTER = "createSemester";
export const DELETE_SEMESTER = "deleteSemester";
export const EDIT_SEMESTER = "editSemester";
export const ADD_COURSE = "addCourse";
export const DROP_COURSE = "dropCourse";

export const CREATE_COURSE = "createCourse";
export const DELETE_COURSE = "deleteCourse";
export const EDIT_COURSE = "editCourse";
export const ADD_ASSESSMENT = "addAssessment";
export const REMOVE_ASSESSMENT = "removeAssessment";

export const CREATE_ASSESSMENT = "createAssessment";
export const DELETE_ASSESSMENT = "deleteAssessment";
export const EDIT_ASSESSMENT = "editAssessment";

// --------------------------------------------------------------------------------------
// SEMESTER ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a semeseter and adding it to the app
// semesterName: the name of the new semester
// listID: an ID that allows for chronological comparisons with other semesters
// --------------------------------------------------------------------------------------
export const createSemester = (semesterName, listID) =>
({
	type: CREATE_SEMESTER,
	payload: 
	{
		name: semesterName,
		average: -1,
		courses: []
		// listID
	}
});

// --------------------------------------------------------------------------------------
// An action creator for editing an existing semester
// id: unique integer value of the semester to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editSemester = (id, newProps) =>
({
	type: EDIT_SEMESTER,
	payload: {id, newProps}
});

// --------------------------------------------------------------------------------------
// An action creator for deleting a semester from the app
// id: unique integer value of the semester to be deleted
// --------------------------------------------------------------------------------------
export const deleteSemester = (id) =>
({
	type: DELETE_SEMESTER,
	payload: id
});

// --------------------------------------------------------------------------------------
// An action creator for adding an existing course a semester
// semesterID: the id of the semester of interest
// courseID: the id of the course to add the semester of interest
// --------------------------------------------------------------------------------------
export const addCourse = (semesterID, courseID) =>
({
	type: ADD_COURSE,
	payload: {semesterID, courseID}
});

// --------------------------------------------------------------------------------------
// An action creator for dropping a course from a semester
// semesterID: the id of the semester of interest
// courseID: the id of the course to add the semester of interest
// --------------------------------------------------------------------------------------
export const dropCourse = (semesterID, courseID) =>
({
	type: DROP_COURSE,
	payload: {semesterID, courseID}
});

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
export const createCourse = (name, markBreakdown) =>
({
	type: CREATE_COURSE,
	payload:
	{
		name,
		completion: 0.0,
		average: -1,
		breakdown: markBreakdown,
		assessments: []
	}
});

// --------------------------------------------------------------------------------------
// An action creator for editing an existing course
// id: unique integer value of the course to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editCourse = (id, newProps) =>
({
	type: EDIT_COURSE,
	payload: {id, newProps}
});

// --------------------------------------------------------------------------------------
// An action creator for deleting a course from the app
// id: unique integer value of the course to be deleted
// --------------------------------------------------------------------------------------
export const deleteCourse = (id) =>
({
	type: DELETE_COURSE,
	payload: id
});

// --------------------------------------------------------------------------------------
// An action creator that adds an assessment to this course
// courseID: the id of the course of interest
// assessmentID: the id of the assessment to add to the course of interest
// --------------------------------------------------------------------------------------
export const addAssessment = (courseID, assessmentID) =>
({
	type: ADD_ASSESSMENT,
	payload: {courseID, assessmentID}
});

// --------------------------------------------------------------------------------------
// An action creator that removes an assessment from this course
// courseID: the id of the course of interest
// assessmentID: the id of the assessment to add to the course of interest
// --------------------------------------------------------------------------------------
export const removeAssessment = (courseID, assessmentID) =>
({
	type: REMOVE_ASSESSMENT,
	payload: {courseID, assessmentID}
});

// --------------------------------------------------------------------------------------
// ASSESSMENT ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a new assessment and adding it to the app
// type: an integer that corresponds to the assessmentTypes in assessmentTypes.js
// name: the name of the assessment, defaults to the form "[type] [number]"
//      (i.e. Assignment 5), however a custom name can be provided
// grade: a float for the grade inputted by the user
// --------------------------------------------------------------------------------------
export const createAssessment = (type, name, grade) =>
({
	type: CREATE_ASSESSMENT,
	payload: 
	{
		type,
		name,
		grade,
		hidden: false
	}
});

// --------------------------------------------------------------------------------------
// An action creator for editing an existing assessment (and in turn inputting a grade)
// id: unique integer value of the assessment to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editAssessment = (id, newProps) =>
({
	type: actionTypes.EDIT_ASSESSMENT,
	payload: {id, newProps}
});

// --------------------------------------------------------------------------------------
// An action creator for deleting an assessment from the app
// id: the unique ID of the course being deleted
// --------------------------------------------------------------------------------------
export const deleteAssessment = (id) =>
({
	type: actionTypes.DELETE_ASSESSMENT,
	payload: id
});
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
// AVERAGE CALCULATOR
// --------------------------------------------------------------------------------------

// A function that recalculates the selected course's average
const recalculateCourse = (dispatch, getState) =>
{
	// Getting the required state from the store
	let {
		courseList,
		assessmentList,
		selectedCourse
	} = getState();

	// Calculating the selected course's average
	let {assessments} = courseList[selectedCourse];
	let newProps =
	{
		average: -1,
		completion: 0
	};

	if (assessments.length != 0)
	{
		assessments.forEach(id =>
		{
			if (!assessmentList[id].hidden)
			{
				newProps.completion += assessmentList[id].weight;
				newProps.average += assessmentList[id].weight * assessmentList[id].grade;
			}
		});
	}

	// Dispatching the changes
	dispatch(editCourse(selectedCourse, newCourseProps));

	// Recalculating the average of the semester this course belongs to
	recalculateSemester(dispatch, getState);
};

// A function that recalculates the selected semester's average
const recalculateSemester = (dispatch, getState) =>
{
	// Getting the required state from the store
	let {
		semesterList,
		courseList,
		selectedSemester
	} = getState();

	// Calculating the selected semester's average
	let {courses} = semesterList[selectedSemester];
	let newProps = {average: -1};

	if (courses.length != 0)
	{
		let sum = 0;
		let count = 0;
		courses.forEach(id =>
		{
			if (courseList[id].average != -1)
			{
				sum += courseList[id].average;
				count++;
			}
		});

		if (count != 0)
			newProps.average = sum / count;
	}

	// Dispatching the changes
	dispatch(editSemester(selectedSemester, newSemesterProps));
};

// --------------------------------------------------------------------------------------
// SEMESTER ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a semeseter and adding it to the app
// name: the name of the new semester
// --------------------------------------------------------------------------------------
export const createSemester = (name) =>
{
	return (dispatch, getState) =>
	{
		// Getting the semester list from the store
		let {semesterList} = getState();

		// Finding an unused ID
		let newID = 0;
		while (true)
		{
			if (semesterList[newID] == undefined)
				break;
			else
				newID++;
		}

		// Dispatching the action
		dispatch({
			type: CREATE_SEMESTER,
			payload:
			{
				_id: newID,
				name,
				courses: [],
				average: -1
			}
		});
	};
};

// --------------------------------------------------------------------------------------
// An action creator for editing an existing semester
// Amendable properties: name
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
{
	return (dispatch, getState) =>
	{
		// Getting the required state from the store
		let {courseList, semesterList} = getState();
		let {courses} = semesterList[id];

		// Deleting all the courses that belong to this semester
		courses.forEach(courseID =>
		{
			// Deleting all the assessments that belong to this course
			courseList[courseID].assessments.forEach(assessID =>
			{
				dispatch({
					type: DELETE_ASSESSMENT,
					payload: assessID
				});
			});

			// Deleting this course
			dispatch({
				type: DELETE_COURSE,
				payload: courseID
			});
		});

		// Deleting this semester
		dispatch({
			type: DELETE_SEMESTER,
			payload: id
		});
	};
};

// --------------------------------------------------------------------------------------
// COURSE ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a course
// name: the name of the new course
// markBreakdown: A list of floats corresponding to the weight of each assessment type
//                  in the course. This is optionally inputted by the user
// --------------------------------------------------------------------------------------
export const createCourse = (name, markBreakdown) =>
{
	return (dispatch, getState) =>
	{
		// Getting the required state from the store
		let {courseList, selectedSemester} = getState();

		// Finding an unused ID
		let newID = 0;
		while (true)
		{
			if (courseList[newID] == undefined)
				break;
			else
				newID++;
		}

		// Creating the course
		dispatch({
			type: CREATE_COURSE,
			payload:
			{
				_id: newID,
				name,
				breakdown: markBreakdown,
				assessments: [],
				completion: 0,
				average: -1
			}
		});

		// Adding the course to the semester
		dispatch({
			type: ADD_COURSE,
			payload: {selectedSemester, newID}
		});
	};
};

// --------------------------------------------------------------------------------------
// An action creator for editing an existing course
// Amendable properties: name, breakdown
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
{
	return (dispatch, getState) =>
	{
		// Getting the required state from the store
		let {courseList, selectedSemester} = getState();
		let {assessments} = courseList[id];
	
		// Deleting all the assessments that belong to this course
		assessments.forEach(assessID =>
		{
			dispatch({
				type: DELETE_ASSESSMENT,
				payload: assessID
			});
		});
	
		// Deleting the course
		dispatch({
			type: DELETE_COURSE,
			payload: id
		});
	
		// Dropping this course from the semester
		dispatch({
			type: DROP_COURSE,
			payload: {selectedSemester, id}
		});
	
		// Recalculating the semester's average
		recalculateSemester(dispatch, getState);
	};
};

// --------------------------------------------------------------------------------------
// ASSESSMENT ACTION CREATORS
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// An action creator for creating a new assessment and adding it to the app
// name: the name of the assessment, defaults to the form "[type] [number]"
//      (i.e. Assignment 5), however a custom name can be provided
// grade: a float for the grade inputted by the user
// weight: the weight of the assessment
// --------------------------------------------------------------------------------------
export const createAssessment = (name, grade, weight) =>
{
	return (dispatch, getState) =>
	{
		// Getting the required state from the store
		let {assessmentList, selectedCourse} = getState();

		// Finding an unused ID
		let newID = 0;
		while (true)
		{
			if (assessmentList[newID] == undefined)
				break;
			else
				newID++;
		}

		// Creating the assessment
		dispatch({
			type: CREATE_ASSESSMENT,
			payload:
			{
				_id: newID,
				name,
				grade,
				weight,
				hidden: false
			}
		});

		// Adding the assessment to the course
		dispatch({
			type: ADD_ASSESSMENT,
			payload: {selectedCourse, newID}
		});

		// Recalculating the averages that this assessment impacts
		recalculateCourse(dispatch, getState);
	};
};

// --------------------------------------------------------------------------------------
// An action creator for editing an existing assessment (and in turn inputting a grade)
// Amendable properties: name, grade, weight, hidden
// id: unique integer value of the assessment to be modified
// newProps: an object containing only the modified properties
// --------------------------------------------------------------------------------------
export const editAssessment = (id, newProps) =>
{
	return (dispatch, getState) =>
	{
		// Dispatching the original edit
		dispatch({
			type: EDIT_ASSESSMENT,
			payload: {id, newProps}
		});

		// Recalculating the averages that this assessment impacts
		recalculateCourse(dispatch, getState);
	};
};

// --------------------------------------------------------------------------------------
// An action creator for deleting an assessment from the app
// id: the unique ID of the course being deleted
// --------------------------------------------------------------------------------------
export const deleteAssessment = (id) =>
{
	return (dispatch, getState) =>
	{
		// Getting the required state from the store
		let {selectedCourse} = getState();

		// Deleting the assessment
		dispatch({
			type: DELETE_ASSESSMENT,
			payload: id
		});

		// Removing the assessment from the course
		dispatch({
			type: REMOVE_ASSESSMENT,
			payload: {selectedCourse, id}
		});

		// Recalculating the averages that this assessment impacts
		recalculateCourse(dispatch, getState);
	};
};
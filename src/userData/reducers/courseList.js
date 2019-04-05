// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the courses in the app
// It sorts all the courses by giving them all a unique ID, which semesters will then refer to.
//
// Below is the structure for this portion of the state
// courseList:
// {
//		[id]: {name: string, completion: float, average: float, breakdown: [float], assessments: [int]}
//		...
// }
// --------------------------------------------------------------------------------------

import {CLEAN_COURSE_LIST, CREATE_COURSE, DELETE_COURSE, EDIT_COURSE, ADD_ASSESSMENT, REMOVE_ASSESSMENT} from '../actions';

export default (prevState = {}, action) =>
{
	switch (action.type)
	{
		// ------------------------------------------------------------------------------
		// TODO: REDO
		// CASE: the course list is being purged of all courses whose parent semester
		//      no longer exists
		// PAYLOAD: a list of all the course IDs for courses that no longer
		//			belong to a semester
		// ------------------------------------------------------------------------------
		// case CLEAN_COURSE_LIST:

		// 	let newCourseList = {};
		// 	for (id in prevState)
		// 	{
		// 		if (!(id in action.payload))
		// 			newCourseList = Object.assign(newCourseList, {[id]: prevState[id]});
		// 	}

		// 	return newCourseList;

		// ------------------------------------------------------------------------------
		// CASE: a course is being added to the app
		// PAYLOAD: {name: string, completion: float, average: float, breakdown: [float], assessments: [int]}
		// ------------------------------------------------------------------------------
		case CREATE_COURSE:

			// Finding an unused ID
			let newID = 0;
			while (true)
			{
				if (prevState[newID] == undefined)
					break;
				else
					newID++;
			}

			return {
				...prevState,
				[newID]: action.payload
			};

		// ------------------------------------------------------------------------------
		// CASE: an existing course is being modified
		// PAYLOAD: {id, newProps}
		//      id: the unique id of the course to be modified
		//      newProps: an object of the new values of the properties being changed
		// ------------------------------------------------------------------------------
		case EDIT_COURSE:
			let {id, newProps} = action.payload;
			
			// Making the changes to the course object
			let modifiedCourse = Object.assign({}, prevState[id], newProps);

			return {
				...prevState,
				[id]: modifiedCourse
			};

		default:
			return prevState;
		
		// ------------------------------------------------------------------------------
		// CASE: a course is being removed from the app
		// PAYLOAD: int, the ID of the course to be removed
		// ------------------------------------------------------------------------------
		case DELETE_COURSE:

			let courseList = {};
			for (id in prevState)
			{
				if (id != action.payload)
					courseList = Object.assign(courseList, {[id]: prevState[id]});
			}

			return courseList;

		// ------------------------------------------------------------------------------
		// CASE: an assessment is being added to the course
		// PAYLOAD: {courseID, assessmentID}
		// 			courseID: the course that's getting a new assessment
		//			assessmentID: the assessment being added to the course
		// ------------------------------------------------------------------------------	
		case ADD_ASSESSMENT:
			let {courseID, assessmentID} = action.payload;

			// Getting the target course
			let targetCourse = {...prevState[courseID]};
			
			// Adding the course
			targetCourse.courses.push(assessmentID);

			return {
				...prevState,
				[courseID]: targetCourse
			};

		// ------------------------------------------------------------------------------
		// CASE: an assessment is being removed from a course
		// PAYLOAD: {courseID, assessmentID}
		//			courseID: the course that's losing an assessment
		//			assessmentID: the assessment being removed from the course
		// ------------------------------------------------------------------------------
		case REMOVE_ASSESSMENT:
		let {courseID, assessmentID} = action.payload;

			// Getting the target course
			let targetCourse = {...prevState[courseID]};
			
			// Removing the assessment
			targetCourse.courses = targetCourse.assessments.filter(assess => assess != assessmentID);

			return {
				...prevState,
				[courseID]: targetCourse
			};
			
		default:
			return prevState;
	}
};
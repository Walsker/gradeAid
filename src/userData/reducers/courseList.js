// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the courses in the app
// It sorts all the courses by giving them all a unique ID, which semesters will then refer to.
//
// Below is the structure for this portion of the state
// courseList:
// {
//		[id]: {_id: int, name: string, breakdown: [float], assessments: [int], completion: float, average: float}
//		...
// }
// --------------------------------------------------------------------------------------

import {ERASE_USER_DATA, CREATE_COURSE, DELETE_COURSE, EDIT_COURSE, ADD_ASSESSMENT, REMOVE_ASSESSMENT} from '../actions';

const INITIAL_STATE = {};

export default (prevState = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		// --------------------------------------------------------------------------------------
		// CASE: User data is being purged
		// PAYLOAD: none.
		// --------------------------------------------------------------------------------------
		case ERASE_USER_DATA:
			return INITIAL_STATE;

		// ------------------------------------------------------------------------------
		// CASE: a course is being added to the app
		// PAYLOAD: {_id: int, name: string, completion: float, average: float, breakdown: [float], assessments: [int]}
		// ------------------------------------------------------------------------------
		case CREATE_COURSE:
			return {
				...prevState,
				[action.payload._id]: action.payload,
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
			targetCourse.assessments.push(assessmentID);

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
		case REMOVE_ASSESSMENT: {
			let {courseID, assessmentID} = action.payload;

			// Getting the target course
			let targetCourse = {...prevState[courseID]};
			
			// Removing the assessment
			targetCourse.assessments = targetCourse.assessments.filter(assess => assess != assessmentID);

			return {
				...prevState,
				[courseID]: targetCourse
			};
		}

		default:
			return prevState;
	}
};
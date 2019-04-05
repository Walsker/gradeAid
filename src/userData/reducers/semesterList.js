// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the semesters in the app
// It sorts all the semesters by giving them all a unique ID
//
// Below is the structure for this portion of the state
// semesterList:
// {
//		[id]: {name: string, average: float, courses: [int]},
//		...
// }
// --------------------------------------------------------------------------------------

import {ERASE_APP_DATA, CREATE_SEMESTER, DELETE_SEMESTER, EDIT_SEMESTER, ADD_COURSE, DROP_COURSE} from '../actions';

export default (prevState = {}, action) =>
{
	switch (action.type)
	{
		// --------------------------------------------------------------------------------------
		// TODO: REDO
		// CASE: app data is being erased
		// PAYLOAD: an empty object
		// --------------------------------------------------------------------------------------
		// case ERASE_APP_DATA:
		
		// 	return action.payload;
		
		// ------------------------------------------------------------------------------
		// CASE: a new semester is being created
		// PAYLOAD: {name: string, average: int, courses: [int]}
		// ------------------------------------------------------------------------------
		case CREATE_SEMESTER:

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
				[newID]: action.payload,
			};

		// ------------------------------------------------------------------------------
		// CASE: an existing semester is being modified
		// PAYLOAD: {id, newProps}
		//      id: the unique id of the semester to be modified
		//      newProps: an object of the new values of the properties being changed
		// ------------------------------------------------------------------------------
		case EDIT_SEMESTER:
			let {id, newProps} = action.payload;

			// Making the changes to the semester object
			let modifiedSemester = Object.assign({}, prevState[id], newProps);

			return {
				...prevState,
				[id]: modifiedSemester
			};

		// ------------------------------------------------------------------------------
		// CASE: a semester is being removed from the app
		// PAYLOAD: int, the ID of the semester to be removed
		// ------------------------------------------------------------------------------
		case DELETE_SEMESTER:

			let semesterList = {};
			for (id in prevState)
			{
				if (id != action.payload)
					semesterList = Object.assign(semesterList, {[id]: prevState[id]});
			}
			
			return semesterList;

		// ------------------------------------------------------------------------------
		// CASE: a course is being added to a semester
		// PAYLOAD: {semesterID, courseID}
		//			semesterID: the semester that's getting a new course
		//			courseID: the course being added to the semester
		// ------------------------------------------------------------------------------
		case ADD_COURSE:
			let {semesterID, courseID} = action.payload;

			// Getting the target semester
			let targetSemester = {...prevState[semesterID]};
			
			// Adding the course
			targetSemester.courses.push(courseID);

			return {
				...prevState,
				[semesterID]: targetSemester
			};
		
		// ------------------------------------------------------------------------------
		// CASE: a course is being removed from a semester
		// PAYLOAD: {semesterID, courseID}
		//			semesterID: the semester that's losing a course
		//			courseID: the course being removed from the semester
		// ------------------------------------------------------------------------------
		case DROP_COURSE:
			let {semesterID, courseID} = action.payload;

			// Getting the target semester
			let targetSemester = {...prevState[semesterID]};
			
			// Adding the course
			targetSemester.courses = targetSemester.courses.filter(course => course != courseID);

			return {
				...prevState,
				[semesterID]: targetSemester
			};
			
		default:
			return prevState;
	}
};
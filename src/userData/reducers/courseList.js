// --------------------------------------------------------------------------------------
// A reducer that handles a list of all the courses in the app
// It sorts all the courses by giving them all a unique ID, which semesters will then refer to.
//
// Below is the structure for this portion of the state
// courseList:
// {
//      [id]: {name: string, semesterID: int, newCourse: bool}
// }
// --------------------------------------------------------------------------------------

import {CLEAN_COURSE_LIST, CREATE_COURSE, DELETE_COURSE, EDIT_COURSE} from '../actionTypes';

export default (prevState = {}, action) =>
{
	switch (action.type)
	{
		// ------------------------------------------------------------------------------
		// CASE: the course list is being purged of all courses whose parent semester
		//      no longer exists
		// PAYLOAD: a list of all the course IDs for courses that no longer
		//			belong to a semester
		// ------------------------------------------------------------------------------
		case CLEAN_COURSE_LIST:

			var newCourseList = {};
			for (id in prevState)
			{
				if (!(id in action.payload))
				{
					console.log(prevState[id])
					newCourseList = Object.assign(newCourseList, {[id]: prevState[id]});
				}
			}

			return newCourseList;

		// ------------------------------------------------------------------------------
		// CASE: a course is being added to the app
		// PAYLOAD: a course object in the form
		//      {name: string, semesterID: newCourse: bool, breakdown: float[]}
		// ------------------------------------------------------------------------------
		case CREATE_COURSE:

			// Finding an unused ID
			var newID = 0;
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
		// CASE: a course is being removed from the app
		// PAYLOAD: int, the ID of the course to be removed
		// ------------------------------------------------------------------------------
		case DELETE_COURSE:

			var courseList = {};
			for (id in courseList)
			{
				if (id != action.payload)
				{
					courseList = Object.assign(courseList, prevState[id]);
				}
			}

			return semesterList;

		// ------------------------------------------------------------------------------
		// CASE: an existing course is being modified
		// PAYLOAD: an object in the form
		//      {id, newProps}
		//      id: the unique id of the course to be modified
		//      newProps: an object of the new values of the properties being changed
		// ------------------------------------------------------------------------------
		case EDIT_COURSE:

			// Copying the previous list of courses as to not modify it
			var courseList = {...prevState};
			var oldCourse = courseList[action.payload.id];

			// Making the changes to the course object
			var modifiedCourse = Object.assign({}, oldCourse, action.payload.newProps);

			return {
				...prevState,
				[action.payload.id]: modifiedCourse
			};

		default:
			return prevState
	}
};
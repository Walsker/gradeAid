import {createSelector} from 'reselect';

// Getting the course object stored in the store
const getCourseObject = (state) => state.courseList[state.selectedCourse];

// Creating a list of assessment objects that belong to this class
const getAssessments = (state) =>
{
	// Getting required required values from state
	let {assessmentList, courseList, selectedCourse} = state;
	let targetAssessments = courseList[selectedCourse].assessments;

	// Getting the assessment objects related to this course
	let assessments = [];
	for (x of targetAssessments)
		assessments.push(assessmentList[x]);
	
	return assessments;
};

// Creating a course object that has calculated its average and completion
const assembleCourse = (courseObject, assessments) =>
{
	let preAverage = 0;
	let completion = 0;

	// Going through all the course's assessments
	for (i of assessments)
	{
		if (assessments[i].hidden) continue;

		// Getting the weight of this assignment
		let weight = courseObject.breakdown[assessments[i].type];
		
		completion += weight;
		preAverage += assessments[i].grade * weight;
	}

	// Returning the complete course
	return {
		...courseObject,
		completion,
		average: preAverage / completion,
		emptyCourse: (courseObject.assessments.length == 0 || completion == 0)
	};
};

export const getCourse = createSelector(
	[getCourseObject, getAssessments],
	assembleCourse
);
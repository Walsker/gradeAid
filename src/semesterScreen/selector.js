import {createSelector} from 'reselect';

const getSemesterObject = (state) => state.semesterList[state.selectedSemester];

const getCourses = (state) =>
{
	// Getting required required values from state
	let {courseList, semesterList, selectedSemester} = state;
	let targetCourses = semesterList[selectedSemester].courses;

	// Getting the course objects related to this course
	let courses = [];
	for (x of targetCourses)
		courses.push(_completeCourse(courseList[x], assessmentList));
	
	return courses;
};

const _completeCourse = (courseObject, assessmentList) =>
{
	let preAverage = 0;
	let completion = 0;
	let {assessments} = courseObject;

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
		average: preAverage / completion,
		emptyCourse: (courseObject.assessments.length == 0 || completion == 0)
	};
};

const assembleSemester = (semesterObject, courses) =>
{
	// Finding out if all the courses don't have assessments
	let allCoursesEmpty = courses.reduce((allEmpty, targetCourse) => targetCourse.emptyCourse && allEmpty, true);

	// Calculating the semester average
	let average = courses.reduce((sum, targetCourse) => sum + targetCourse.average);
	average /= courses.length;

	return {
		...semesterObject,
		average,
		emptySemester: (semesterObject.courses.lengh == 0 || allCoursesEmpty)
	};
};

export const getSemester = createSelector(
	[getSemester, getCourses],
	assembleSemester
);
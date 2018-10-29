import * as actionTypes from './actionTypes';
import {editSemester, editCourse, deleteCourse, deleteAssessment} from './actions';
import * as Assessment from 'gradeAid/src/semesterScreen/assessmentTypes';

const toLetterGrade = (grade) =>
{
	if (grade < .50)
		return 'F';
	else if (grade < .53)
		return 'D-';
	else if (grade < .57)
		return 'D';
	else if (grade < .60)
		return 'D+';
	else if (grade < .63)
		return 'C-';
	else if (grade < .67)
		return 'C';
	else if (grade < .70)
		return 'C+';
	else if (grade < .73)
		return 'B-';
	else if (grade < .77)
		return 'B';
	else if (grade < .80)
		return 'B+';
	else if (grade < .85)
		return 'A-';
	else if (grade < .90)
		return 'A';
	else
		return 'A+';
}

const calculateCourseAverage = (store, next, courseID) =>
{
	var assessList = store.getState().assessmentList;
	var courseObject = store.getState().courseList[courseID];

	var componentAverage = [];
	var numOfComponentsUsedSoFar = 0;
	for (i in Assessment.types)
	{
		componentAverage.push(-1);
		var componentSum = 0;
		var assessCount = 0;
		var componentUsed = false;
		for (id in assessList)
		{
			if (assessList[id].type == i && assessList[id].courseID == courseID)
			{
				componentUsed = true;
				componentSum += assessList[id].grade;
				assessCount++;
			}
		}

		if (componentUsed)
			numOfComponentsUsedSoFar++;

		if (assessCount != 0)
			componentAverage[i] = componentSum / assessCount;
	}

	var courseAverage = 0;
	var normalizer = 0;
	var normalize = false;
	for (i in componentAverage)
	{
		if (componentAverage[i] != -1)
		{
			normalizer += courseObject.breakdown[i];

			if (numOfComponentsUsedSoFar == 1)
			{
				courseAverage = componentAverage[i];
				break;
			}
			else
				courseAverage += (componentAverage[i] * courseObject.breakdown[i]);
		}
	}

	if (numOfComponentsUsedSoFar == 0)
		courseAverage = -1;
	else if (numOfComponentsUsedSoFar != 1)
		courseAverage /= normalizer;

	next(editCourse(courseID, {average: courseAverage}));
	calculateSemesterAverage(store, next, courseObject.semesterID);
}

const calculateSemesterAverage = (store, next, semesterID) =>
{
	var averageSum = 0;
	var courseList = store.getState().courseList;
	var zeroCourses = true;
	for (id in courseList)
	{
		averageSum += courseList[id].average;
		zeroCourses = false;
	}

	var semesterAverage = averageSum / Object.keys(courseList).length;
	next(editSemester(semesterID, {average: (zeroCourses ? 'X' : toLetterGrade(semesterAverage))}));
}

export const averageCalculator = store => next => action =>
{
	switch(action.type)
	{
		case actionTypes.CREATE_ASSESSMENT:
		case actionTypes.DELETE_ASSESSMENT:
		case actionTypes.EDIT_ASSESSMENT:

			var courseID;
			if (action.type == actionTypes.CREATE_ASSESSMENT)
				courseID = action.payload.courseID;
			if (action.type == actionTypes.DELETE_ASSESSMENT)
				courseID = store.getState().assessmentList[action.payload].courseID;
			if (action.type == actionTypes.EDIT_ASSESSMENT)
				courseID = store.getState().assessmentList[action.payload.id].courseID;

			var result = next(action);
			calculateCourseAverage(store, next, courseID);
			return result;

		case actionTypes.EDIT_COURSE:
			calculateCourseAverage(store, next, action.payload.id);

		default:
			return next(action);
	}
}

const cleanAssessList = (store, next) =>
{
	var assessList = store.getState().assessmentList;
	var existingCourseIDs = Object.keys(store.getState().courseList);

	for (id in assessList)
	{
		if (!(existingCourseIDs.includes(assessList[id].courseID)))
			next(deleteAssessment(id));
	}
}

const cleanCourseList = (store, next) =>
{
	var courseList = store.getState().courseList;
	var existingSemesterIDs = Object.keys(store.getState().semesterList);

	for (id in courseList)
	{
		if (!(existingSemesterIDs.includes(courseList[id].semesterID)))
			next(deleteCourse(id));
	}
}

export const listCleaner = store => next => action =>
{
	switch(action.type)
	{
		case actionTypes.DELETE_COURSE:
			
			var result = next(action);

			cleanAssessList(store, next);

			if (Object.keys(store.getState().semesterList).includes(result.payload))
				calculateSemesterAverage(store, next, result.payload);

			return result;

		case actionTypes.DELETE_SEMESTER:
		case actionTypes.ERASE_APP_DATA:

			var result = next(action);

			cleanCourseList(store, next);
			cleanAssessList(store, next);

			return result;

		default:
			next(action);
	}
}
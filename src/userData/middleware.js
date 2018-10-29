import * as actionTypes from './actionTypes';
import {editSemester, editCourse, deleteCourse, deleteAssessment} from './actions';
import * as Assessment from 'easyGrades/src/semesterScreen/assessmentTypes';

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

	var grades = {};
	for (i in Assessment.types)
		grades[i] = [];

	for (id in assessList)
	{
		if (assessList[id].courseID == courseID)
			grades[assessList[id].type].push(assessList[id].grade);
	}

	var zeroAssessments = true;
	var onlyOneType = false;
	for (i in grades)
	{
		if (grades[i].length != 0 && !onlyOneType)
		{
			onlyOneType = true;
			zeroAssessments = false;
		}
		else if (grades[i].length != 0 && onlyOneType)
		{
			onlyOneType = false;
			break;
		}
	}

	var courseAverage = 0;
	for (i in grades)
	{
		var componentSum = 0
		if (grades[i].length != 0)
		{
			for (j in grades[i])
				componentSum += grades[i][j];

			courseAverage += (componentSum / grades[i].length) *
				(onlyOneType ? 1 : courseObject.breakdown[i]);
		}
	}

	next(editCourse(courseID, {average: (zeroAssessments ? -1 : courseAverage)}));
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

			var result = next(action);
			var courseID;
			
			if (action.type == actionTypes.CREATE_ASSESSMENT)
				courseID = action.payload.courseID;
			if (action.type == actionTypes.DELETE_ASSESSMENT)
				courseID = action.payload;
			if (action.type == actionTypes.EDIT_ASSESSMENT)
				courseID = action.payload.id;

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
			console.log("DELETING COURSE");
			var result = next(action);
			
			cleanAssessList(store, next);
			
			if (Object.keys(store.getState().semesterList).includes(result.payload))
				calculateSemesterAverage(store, next, result.payload);

			return result;

		case actionTypes.DELETE_SEMESTER:
			
			var result = next(action);
			
			cleanCourseList(store, next);
			cleanAssessList(store, next);

			return result;

		default:
			next(action);
	}
}
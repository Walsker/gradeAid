
// Redux imports
import {combineReducers} from 'redux';
import {GENERATE_ROUTE_CONFIGS} from './_actionTypes';

// Custom imports
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';

var assessments = [
    {name: "Assignment 1", grade: 80},
    {name: "Assignment 2", grade: 55},
    {name: "Midterm 1", grade: 92.2},
    {name: "Assignment 3", grade: 56},
    {name: "Lab 1", grade: 66},
    {name: "Assignment 4", grade: 100},
    {name: "Midterm 2", grade: 70},
    {name: "Assignment 5", grade: 65}
]

var courses = [
    {name: "COMP 1405", average: 90, assessments},
    {name: "MATH 1007", average: 78, assessments},
    {name: "MATH 1004", average: 85, assessments},
    {name: "CGSC 1001", average: 67, assessments},
    {name: "MUSI 1701", average: 72, assessments}
]

var semesters = [
    {name: 'Fall 2016', courses, gpa: 9.6},
    {name: 'Winter 2017', courses, gpa: 8.0},
    {name: 'Fall 2017', courses, gpa: 10.2},
    {name: 'Winter 2018', courses, gpa: 6.4},
    {name: 'Fall 2018', courses, gpa: 11.8}
]

routeConfigs = (prevState = {screen: SemesterPage}, action) =>
{
    switch(action.type)
    {
        case GENERATE_ROUTE_CONFIGS:
            return action.payload;
        default:
            return prevState;
    }
}

semesterList = (prevState = {}, action) =>
{
    return semesters;
}

export default combineReducers({
    routeConfigs: routeConfigs,
    semesters: semesterList,
    maxGPA: () => {return 12.0}
});
// Redux imports
import * as actionTypes from './actionTypes';

// ---------------------------------------------------------------------------------------
// SET MAX GPA
// ---------------------------------------------------------------------------------------

export const setMaxGPA = (newGPA) =>
{
    return {
        type: actionTypes.SET_MAX_GPA,
        payload: newGPA
    };
}

// ---------------------------------------------------------------------------------------
// SEMESTER ACTIONS
// ---------------------------------------------------------------------------------------

var assessments = [
    {name: "Assignment 1", grade: 80, complete: true},
    {name: "Assignment 2", grade: 55, complete: true},
    {name: "Midterm 1", grade: 92.2, complete: true},
    {name: "Assignment 3", grade: 56, complete: true},
    {name: "Lab 1", grade: 66, complete: true},
    {name: "Assignment 4", grade: 100, complete: false},
    {name: "Midterm 2", grade: 70, complete: false},
    {name: "Assignment 5", grade: 65, complete: false}
];

var courses = [
    {name: "COMP 1405", average: 90, assessments, newCourse: false},
    {name: "MATH 1007", average: 78, assessments, newCourse: false},
    {name: "MATH 1004", average: 85, assessments, newCourse: false},
    {name: "CGSC 1001", average: 67, assessments, newCourse: false},
    {name: "MUSI 1701", average: 72, assessments, newCourse: false}
];

var newSemesters = [
    {name: 'Fall 2016', courses, gpa: 9.6},
    {name: 'Winter 2017', courses, gpa: 8.0},
    {name: 'Fall 2017', courses, gpa: 10.2},
    {name: 'Winter 2018', courses, gpa: 6.4},
    {name: 'Fall 2018', courses, gpa: 11.8}
]
var counter = -1;

export const newSemester = (semesterName) =>
{
    counter++;
    return {
        type: actionTypes.NEW_SEMESTER,
        payload: {name: semesterName, courses: [], gpa: 0}
        // payload: newSemesters[counter]
    };
}

export const newCourse = (semester, newCourse) =>
{
    console.log("Old Semester: ", semester);
    semester.courses.push(newCourse);
    console.log("New Semester: ", semester);
    return {
        type: actionTypes.NEW_COURSE,
        payload: semester
    };
};

export const loadSemesterList = () =>
{
    return {
        type: actionTypes.LOAD_SEMESTER_LIST,
        payload: []
    };
}

export const eraseAppData = () =>
{
    return {
        type: actionTypes.ERASE_DATA
    };
}
// Redux imports
import * as actionTypes from './actionTypes';

// ---------------------------------------------------------------------------------------
// APP SETTINGS ACTIONS
// ---------------------------------------------------------------------------------------


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
var test = {x: 1, y: 2, z: 3}

export const newSemester = (semesterName) =>
{
    counter++;
    return {
        type: actionTypes.NEW_SEMESTER,
        payload: {name: semesterName, courses: [], gpa: 0}
        // payload: newSemesters[counter]
    };
}

export const renameSemester = (oldSemester, newSemesterName) =>
{
    var newSemester = Object.assign({}, oldSemester);
    newSemester.name = newSemesterName;
    
    return {
        type: actionTypes.RENAME_SEMESTER,
        payload: {oldSemester, newSemester}
    };
    
}

const calculateSemesterGPA = (semester) =>
{
    var totalPoints = 0;
    var toatlCredits = 0;

    var courseAverage = 0;
    for (i in semester.courses)
    {
        toatlCredits += 0.5
        courseAverage = semester.courses[i].average;

        if (courseAverage >= 90)
        {
            totalPoints += 12 * 0.5;
        }
        else if (courseAverage >= 85)
        {
            totalPoints += 11 * 0.5;
        }
        else if (courseAverage >= 80)
        {
            totalPoints += 10 * 0.5;
        }
        else if (courseAverage >= 77)
        {
            totalPoints += 9 * 0.5;
        }
        else if (courseAverage >= 73)
        {
            totalPoints += 8 * 0.5;
        }
        else if (courseAverage >= 70)
        {
            totalPoints += 7 * 0.5;
        }
        else if (courseAverage >= 67)
        {
            totalPoints += 6 * 0.5;
        }
        else if (courseAverage >= 63)
        {
            totalPoints += 5 * 0.5;
        }
        else if (courseAverage >= 60)
        {
            totalPoints += 4 * 0.5;
        }
        else if (courseAverage >= 57)
        {
            totalPoints += 3 * 0.5;
        }
        else if (courseAverage >= 53)
        {
            totalPoints += 2 * 0.5;
        }
        else if (courseAverage >= 50)
        {
            totalPoints += 1 * 0.5;
        }        
    }

    return totalPoints / toatlCredits;
}

// ---------------------------------------------------------------------------------------
// COURSE ACTIONS
// ---------------------------------------------------------------------------------------

const calculateCourseAverage = (course) =>
{
    var sum = 0;
    var totalAssessments = 0;

    for (i in course.assessments)
    {
        if (course.assessments[i].complete == true)
        {
            sum += course.assessments[i].grade;
            totalAssessments++;
        }
    }

    return sum / totalAssessments;
}

export const newCourse = (semester, newCourse) =>
{
    semester.courses.push(newCourse);
    console.log(newCourse);

    return {
        type: actionTypes.NEW_COURSE,
        payload: semester
    };
};

const _inputGrade = (grade, assessmentName, courseName, semesterObject) =>
{
    for (i in semesterObject.courses)
    {
        if (semesterObject.courses[i].name == courseName)
        {
            console.log("HI:", semesterObject.courses[i]);
            for (j in semesterObject.courses[i].assessments)
            {
                if (semesterObject.courses[i].assessments[j].name == assessmentName)
                {
                    semesterObject.courses[i].assessments[j].complete = true;
                    semesterObject.courses[i].assessments[j].grade = grade;
                    semesterObject.courses[i].newCourse = false;
                    semesterObject.courses[i].average = calculateCourseAverage(semesterObject.courses[i]);

                    semesterObject.gpa = calculateSemesterGPA(semesterObject);

                    return semesterObject;
                }
            }
        }
    }
}
export const inputGrade = (grade, assessmentName, courseName, semesterObject) =>
{
    var newSemesterObject = _inputGrade(grade, assessmentName, courseName, semesterObject);

    return {
        type: actionTypes.INPUT_GRADE,
        payload: newSemesterObject
    };
}
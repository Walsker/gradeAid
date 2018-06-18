// React Native imports
import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';

// Custom imports
import RootNavigator from './_rootNavigator';
import {containerStyle} from 'easyGrades/src/common/appStyles';
import AndroidBar from 'easyGrades/src/common/androidBar';
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';
import AddCoursePage from 'easyGrades/src/addCoursePage/addCoursePage';

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

export default class App extends Component
{
	render()
	{
		return(
			<View style = {containerStyle.default}>
				<AndroidBar/>
				<StatusBar
					translucent
					animated
					backgroundColor = "rgba(0, 0, 0, 0.2)"
				/>
				<RootNavigator semesters = {semesters}/>
			</View>
		);
	}
}

// This is to get rid of the warning caused while mounting screens with React-navigation.
// There's a possibility that this warning is a false-positive.
// Check if this is fixed in the next React Native update.
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
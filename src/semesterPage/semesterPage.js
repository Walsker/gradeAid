// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {createStackNavigator} from 'react-navigation';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import ActionBar from 'easyGrades/src/common/actionBar';
import ActionButton from 'easyGrades/src/common/actionButton';
import Tile from 'easyGrades/src/common/tile';
import CourseList from 'easyGrades/src/common/courseList';
import CoursePage from 'easyGrades/src/coursePage/coursePage';

// ----------------------------------------------------------------------------------
// MOCK REDUX STATE
// ----------------------------------------------------------------------------------

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

var currentGPA = 9.6;
var maxGPA = 12;

// ----------------------------------------------------------------------------------

class SemesterScreen extends Component
{
    render()
    {
        return(
            <View style = {containerStyle.default}>
                <ActionBar
                    leftButton = 
                    {
                        <ActionButton
                            type = "menu"
                            size = {30}
                            color = {colors.titleAndIconColor}
                        />
                    }
                    title = "Fall 2017"
                    rightButton = 
                    {
                        <ActionButton
                            type = "more-vert"
                            size = {30}
                            color = {colors.titleAndIconColor}
                        />
                    }
                />
                <ScrollView style = {containerStyle.tileList}>
                    <Tile title = "Semester Average" 
                        content = 
                        {
                            <View>
                                <View style = {{marginVertical: -25}}>
                                    <Text style = {textStyle.gpaDisplay}>{currentGPA}</Text>
                                </View>
                                <Text style = {textStyle.gpaMax}>out of {maxGPA}</Text>
                            </View>
                        }
                    />
                    <Tile title = "Courses" 
                        content = 
                        {
                            <CourseList
                                courses = {courses}
                                navProp = {this.props.navigation}
                            />
                        }
                    />
                    <View style = {{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}

// TODO: Turn this into an action when you add redux
const generateRouteConfigs = (courseList) =>
{
    var output = {'Semester': {screen: SemesterScreen}}

    for (i in courses)
    {
        output[courseList[i].name] = {screen: CoursePage}
    }

    console.log(output);
    return output;
}

export default SemesterPage = createStackNavigator(generateRouteConfigs(courses),
{
    headerMode: 'none',
    initialRouteName: 'Semester'
});
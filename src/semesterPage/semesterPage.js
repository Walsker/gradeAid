// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import AssessmentList from 'easyGrades/src/common/assessmentList';
import ProgressCircle from 'easyGrades/src/common/progressCircle';
import ActionBar from 'easyGrades/src/common/actionBar';
import ActionButton from 'easyGrades/src/common/actionButton';
import Tile from 'easyGrades/src/common/tile';
import CourseList from 'easyGrades/src/common/courseList';

var courses = [
    {name: "COMP 1405", average: 90},
    {name: "MATH 1007", average: 78},
    {name: "MATH 1004", average: 85},
    {name: "CGSC 1001", average: 67},
    {name: "MUSI 1701", average: 72}
]

export default class SemesterPage extends Component
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
                            <Text style = {textStyle.gpaDisplay}>9.6</Text>
                        }
                    />
                    <Tile title = "Courses" 
                        content = 
                        {
                            <CourseList courses = {courses}/>
                        }
                    />
                    <View style = {{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}
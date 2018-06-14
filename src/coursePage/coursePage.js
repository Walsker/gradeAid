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
    {name: "COMP 1405", average: 90},
    {name: "MATH 1007", average: 78},
    {name: "MATH 1004", average: 85},
    {name: "CGSC 1001", average: 67},
    {name: "MUSI 1701", average: 72}
]

export default class CoursePage extends Component
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
                    <Tile title = "Average" 
                        content = 
                        {
                            // <Text style = {textStyle.gpaDisplay}>9.6</Text>
                            // <AssessmentList assessments = {assessments}/>
                            <ProgressCircle
                                diameter = {275}
                                borderWidth = {15}
                                ringColor = {colors.accentColor}
                                // emptyRingColor = 'rgb(150, 150, 150)'
                                emptyRingColor = {colors.darkPrimaryColor}
                                backgroundColor = {colors.spaceColor}
                                percentage = {78}
                                animationDelay = {0}
                            />
                        }
                    />
                    <Tile
                        title = "Insights"
                        content = 
                        {
                            <Text style = {{paddingHorizontal: 10, fontSize: 16, fontFamily: 'Lato-Italic', color: colors.secondaryTextColor, textAlign: 'center'}}>
                                Here I'll include information to do with the goals that the user may have set, or other relevant calculated information.
                                {"\n"}~{"\n"}The above average isn't actually the calculated average, it's just a placeholder.
                            </Text>
                        }
                    />
                    <Tile
                        title = "Overview"
                        content = 
                        {
                            <AssessmentList assessments = {assessments}/>
                        }
                    />
                    <View style = {{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}
// TIles for the Semester Page
{/* <Tile title = "Semester Average" 
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
/> */}

// Tiles for the course page
{/* <Tile title = "Average" 
    content = 
    {
        // <Text style = {textStyle.gpaDisplay}>9.6</Text>
        // <AssessmentList assessments = {assessments}/>
        <ProgressCircle
            diameter = {275}
            borderWidth = {15}
            ringColor = {colors.accentColor}
            emptyRingColor = 'rgb(150, 150, 150)'
            backgroundColor = {colors.spaceColor}
            percentage = {78}
            animationDelay = {0}
        />
    }
/>
<Tile
    title = "Insights"
    content = 
    {
        <Text style = {{paddingHorizontal: 10, fontSize: 16, fontFamily: 'Lato-Italic', color: colors.secondaryTextColor, textAlign: 'center'}}>
            Here I'll include information to do with the goals that the user may have set, or other relevant calculated information.
            {"\n"}~{"\n"}The above average isn't actually the calculated average, it's just a placeholder.
        </Text>
    }
/>
<Tile
    title = "Overview"
    content = 
    {
        <AssessmentList assessments = {assessments}/>
    }
/> */}
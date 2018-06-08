// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import AssessmentList from 'easyGrades/src/common/assessmentList';
import ProgressCircle from 'easyGrades/src/common/progressCircle';
import ActionBar from 'easyGrades/src/common/actionBar';
import Tile from 'easyGrades/src/common/tile';
import ActionButton from 'easyGrades/src/common/actionButton';
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
                            type = "chevron-left"
                            size = {30}
                        />
                    }
                    title = "COMP 1405"
                    rightButton = 
                    {
                        <ActionButton
                            type = "more-vert"
                            size = {30}
                        />
                    }
                />
                <ScrollView style = {containerStyle.page}>
                    <Tile title = "Average" 
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
                    <View style = {{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}


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
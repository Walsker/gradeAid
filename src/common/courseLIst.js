// -----------------------------------------------------------------------------------
// REQUIRED COMPONENTS: Array of Course objects.
// Example:
//  var courses = [
//      {name: "COMP 1405", average: 80},
//      {name: "MATH 1007", average: 55},
//      {name: "MUSI 1701", average: 92.2}
//  ]
// -----------------------------------------------------------------------------------


// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
// TouchableNativeFeedback only works with Android

// Custom imports
import {colors} from './appStyles';
import ProgressCircle from './progressCircle';

export default class CourseList extends Component
{
    createCourseCard(courseName, grade, animationID)
    {
        return(
            <TouchableNativeFeedback 
                key = {courseName}
                onPress = {() => {}}
                background = {TouchableNativeFeedback.Ripple(colors.lightPrimaryColor, false)}
            >
                <View style = {styles.courseCard}>
                    <ProgressCircle
                        diameter = {100}
                        borderWidth = {10}
                        ringColor = {colors.accentColor}
                        emptyRingColor = {colors.darkPrimaryColor}
                        backgroundColor = {colors.spaceColor}
                        percentage = {grade}
                        animationDelay = {500 + (parseInt(animationID) * 750)}
                    />
                    <View style = {styles.courseName}>
                        <Text 
                            style = {styles.courseNameText}
                            numberOfLines = {2}
                        >
                            {courseName}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render()
    {
        var courses = [];
        var animationIDs = 0;
        var rowCounter = 0;
        var tilesPerRow = 3;

        for (var i in this.props.courses)
        {
            courses.push(
                this.createCourseCard(this.props.courses[i].name, this.props.courses[i].average, animationIDs)
            );

            rowCounter++;
            if (rowCounter == tilesPerRow)
            {
                rowCounter = 0;
                animationIDs++;
            }
        }
        return(
            <View style = {styles.list}>
                {courses}
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    list:
    {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: -5
    },
    courseCard:
    {
        padding: 10,
        margin: 5,
        borderRadius: 2,
        elevation: 1
    },
    courseName:
    {
        flex: 1,
        paddingTop: 20
    },
    courseNameText:
    {
        color: colors.primaryTextColor,
        fontFamily: 'Lato-Black',
        fontSize: 18,
        textAlign: 'center',
        width: 100
    }
});
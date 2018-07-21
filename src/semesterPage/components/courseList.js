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
import {colors, containerStyle} from 'easyGrades/src/common/appStyles';
import ProgressCircle from 'easyGrades/src/common/progressCircle';

export default class CourseList extends Component
{
    createCourseCard(course, animationID)
    {
        return(
            <TouchableNativeFeedback 
                key = {course.name}
                background = {TouchableNativeFeedback.Ripple(colors.lightPrimaryColor, false)}
                onPress = {() => this.props.navProp.navigate(course.name, {course})}
            >
                <View style = {containerStyle.courseCard}>
                    <ProgressCircle
                        diameter = {100}
                        borderWidth = {10}
                        ringColor = {colors.accentColor}
                        emptyRingColor = {colors.darkPrimaryColor}
                        backgroundColor = {colors.spaceColor}
                        percentage = {course.average}
                        animationDelay = {500 + (parseInt(animationID) * 750)}
                    />
                    <View style = {styles.courseName}>
                        <Text 
                            style = {styles.courseNameText}
                            numberOfLines = {2}
                        >
                            {course.name}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render()
    {
        var courseTiles = [];
        var animationIDs = 0;
        var rowCounter = 0;
        var tilesPerRow = 3;

        for (var i in this.props.courses)
        {
            courseTiles.push(
                this.createCourseCard(this.props.courses[i], animationIDs)
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
                {courseTiles}
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
        justifyContent: 'center'
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
        fontSize: 17,
        textAlign: 'center',
        width: 100
    }
});
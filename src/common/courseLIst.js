// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Custom imports
import {colors} from './appStyles';
import ProgressCircle from './progressCircle';

export default class CourseList extends Component
{
    createCourseCard(courseName, grade, animationID)
    {
        console.log(animationID * 1000)
        return(
            <TouchableOpacity 
                key = {courseName}
                style = {styles.courseCard}
            >
                <ProgressCircle
                    diameter = {100}
                    borderWidth = {10}
                    ringColor = {colors.accentColor}
                    emptyRingColor = 'rgb(150, 150, 150)'
                    backgroundColor = {colors.spaceColor}
                    percentage = {grade}
                    animationDelay = {500 + (parseInt(animationID) * 1500)}
                />
                <View style = {styles.courseName}>
                    <Text 
                        style = {styles.courseNameText}
                        numberOfLines = {2}
                    >
                        {courseName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render()
    {
        var courses = [];
        var animationIDs = 0;
        var rowCounter = 0;
        for (var i in this.props.courses)
        {
            courses.push(
                this.createCourseCard(this.props.courses[i].name, this.props.courses[i].average, animationIDs)
            );

            rowCounter++;
            if (rowCounter == 3)
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
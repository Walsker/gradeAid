// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import ActionBar from 'easyGrades/src/common/actionBar';
import IconButton from 'easyGrades/src/common/iconButton';
import CourseList from './components/courseList';
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import Tile from 'easyGrades/src/common/tile';

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

class SemesterPage extends Component
{
    newCourse()
    {
        alert("New Course");
    }
    editSemester()
    {
        alert("Edit Semester");
    }
    
    render()
    {
        return(
            <View style = {containerStyle.default}>
                <ActionBar
                    leftButton = 
                    {
                        <IconButton
                            type = 'menu'
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {this.props.navigation.openDrawer}
                        />
                    }
                    title = {this.props.semester.name}
                    rightButton = 
                    {
                        <IconButton
                            type = 'add'
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {this.newCourse}
                        />
                    }
                />
                <ScrollView style = {containerStyle.tileList}>
                    <Tile title = "Semester Average" 
                        content = 
                        {
                            <View>
                                <View style = {{marginVertical: -25}}>
                                    <Text style = {textStyle.gpaDisplay}>{this.props.semester.gpa}</Text>
                                </View>
                                <Text style = {textStyle.gpaMax}>out of {maxGPA}.0</Text>
                            </View>
                        }
                    />
                    <Tile title = "Courses"
                        button = 
                        {
                            <IconButton
                                type = 'edit'
                                size = {25}
                                color = {colors.primaryTextColor}
                                action = {this.editSemester}
                            />
                        }
                        content = 
                        {
                            <CourseList
                                courses = {this.props.semester.courses}
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

const mapStateToProps = (state, regularProps) =>
{   
    const nullCourses = [{name: 'NULL 0000', average: 0, assessments: {}}];
    const nullSemester = {name: 'Fall 1970', nullCourses, gpa: 0.0};
    
    var semesterName = regularProps.navigation.state.routeName;
    var semesterObject = nullSemester;

    for (i in state.semesters)
    {
        if (state.semesters[i].name == semesterName)
        {
            semesterObject = state.semesters[i];
            break;
        }
    }

    return {
        maxGPA: state.maxGPA,
        semester: semesterObject
    };
}

export default connect(mapStateToProps)(SemesterPage);
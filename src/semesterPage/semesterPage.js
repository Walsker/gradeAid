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
import Tile from 'easyGrades/src/common/tile';

class SemesterPage extends Component
{
    newCourse()
    {
        this.props.navigation.navigate("Add Course");
    }

    editSemester()
    {
        alert("Edit Semester");
    }
    
    render()
    {
        // Formatting the GPA numbers
        var maxGPAString = parseFloat(this.props.maxGPA).toFixed(1);
        var GPAString = parseFloat(this.props.semester.gpa).toFixed(1);

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
                            action = {this.newCourse.bind(this)}
                        />
                    }
                />
                <ScrollView style = {containerStyle.tileList}>
                    <Tile title = "Semester Average" 
                        content = 
                        {
                            <View>
                                <View style = {{marginVertical: -25}}>
                                    <Text style = {textStyle.gpaDisplay}>{GPAString}</Text>
                                </View>
                                <Text style = {textStyle.gpaMax}>out of {maxGPAString}</Text>
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
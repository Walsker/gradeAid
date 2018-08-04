// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

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
        this.props.navigation.navigate("Add Course", {semester: this.props.semester});
    }

    editSemester()
    {
        alert("Edit Semester");
    }
    
    renderContent()
    {
        if (!this.props.newSemester)
        {
            // Formatting the GPA numbers
            var maxGPAString = parseFloat(this.props.maxGPA).toFixed(1);
            var GPAString = parseFloat(this.props.semester.gpa).toFixed(1);
            
            return(
                <ScrollView style = {containerStyle.tileList}>
                    <Tile title = "Semester Average" 
                        content = 
                        {
                            <View>
                                <View style = {{marginVertical: -25}}>
                                    <Text style = {textStyle.bold(212)}>{GPAString}</Text>
                                </View>
                                <Text style = {[textStyle.italic(14, 'center'), {color: colors.secondaryTextColor}]}>out of {maxGPAString}</Text>
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
            );
        }
        else
        {
            return(
                <View style = {containerStyle.tileList}>
                    <Tile
                        title = "No Courses"
                        content = 
                        {
                            <View>
                                <View style = {{marginVertical: 5}}/>
                                <Text style = {textStyle.regular(16, 'center')}>
                                    You have no courses in this semester!
                                </Text>
                                <View style = {{marginVertical: 5}}/>
                                <View style = {containerStyle.rowBox}>
                                    <TouchableOpacity
                                        style = {{alignItems: 'center', alignSelf: 'stretch', flex: 1, paddingVertical: 5}}
                                        onPress = {this.newCourse.bind(this)}
                                    >
                                        <View style = {{
                                            backgroundColor: colors.darkPrimaryColor,
                                            paddingVertical: 15,
                                            paddingHorizontal: 50,
                                            borderRadius: 30
                                        }}>
                                            <Text 
                                                style = {[textStyle.bold(20), {color: 'white'}]}
                                            >
                                                Add Course
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                </View>
            );
        }
    }

    render()
    {
        var rightButton = this.props.newSemester ? [<View key = "addButton"/>] :
        [
            <IconButton
                key = "addButton"
                type = 'add'
                size = {30}
                color = {colors.titleAndIconColor}
                action = {this.newCourse.bind(this)}
            />
        ];

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
                    rightButton = {rightButton}
                />
                {this.renderContent()}
            </View>
        );
    }
}

const mapStateToProps = (state, regularProps) =>
{       
    var semesterName = regularProps.navigation.state.routeName;
    var semesterObject = {name: semesterName, courses: [], gpa: null};
    var newSemester = true;

    for (i in state.semesters)
    {
        if (state.semesters[i].name == semesterName)
        {
            semesterObject = state.semesters[i];

            if (semesterObject.courses.length != 0)
            {
                newSemester = false;
            }
            break;
        }
    }

    return {
        maxGPA: state.maxGPA,
        semester: semesterObject,
        newSemester
    };
}

export default connect(mapStateToProps)(SemesterPage);
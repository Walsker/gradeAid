// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton, Tile} from 'easyGrades/src/common';
import CourseList from './_components/courseList';

class SemesterPage extends Component
{
    newCourse()
    {
        this.props.navigation.navigate("AddCoursePage", {semester: this.props.semester});
    }

    editSemester()
    {
        this.props.navigation.navigate("EditSemesterPage", {semester: this.props.semester});
    }
    
    renderContent()
    {
        if (!this.props.newSemester)
        {
            // Formatting the GPA numbers
            var maxGPAString = parseFloat(this.props.maxGPA).toFixed(1);
            var GPAString = parseFloat(this.props.semester.gpa).toFixed(1);
            
            var showNA = true;
            for (i in this.props.semester.courses)
            {
                if (this.props.semester.courses[i].newCourse == false)
                {
                    showNA = false;
                }
            }

            if (showNA == true)
            {
                var GPAString = "N/A";
            }

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
                    <Tile 
                        title = "Courses"
                        content = 
                        {
                            <CourseList
                                semester = {this.props.semester}
                                navProp = {this.props.navigation}
                                newCourse = {this.newCourse.bind(this)}
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
        console.log(this.props.navigation.state);
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
                    rightButton = {
                        <IconButton
                            type = 'edit'
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {this.editSemester.bind(this)}
                        />
                    }
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
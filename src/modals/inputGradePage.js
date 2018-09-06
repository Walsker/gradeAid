// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton} from 'easyGrades/src/common';

class InputGradePage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            course: this.props.navigation.getParam('course', {}),
            semesterName: this.props.navigation.getParam('semesterName', "")
        }
        console.log("COURSE:", this.state.course);
    }

    getCourseObject()
    {
        var semesters = state.semesters;
        var currentSemester;

        for (var semester in semesters)
        {
            if (semester.name == this.state.semesterName)
            {
                currentSemester = semester;
                break;
            }
        }
        
        for (var course in currentSemester.courses)
        {
            if (course.name == this.state.course.name)
            {
                return course
            }
        }
    }

    render()
    {

        var course;
        return(
            <View style = {containerStyle.default}>
                <ActionBar
                    inverted = {true}
                    leftButton = 
                    {
                        <IconButton
                            type = 'arrow-back'
                            size = {30}
                            color = {colors.primaryColor}
                            action = {() => this.props.navigation.pop()}
                        />
                    }
                    title = "Input Grade"
                />
                    <Text>Course Name: {this.state.course.name}</Text>
                    <Text>Semester Name: {this.state.semesterName}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state, regularProps) =>
{
    
    return {semesters: state.semesters};
};
export default connect(mapStateToProps)(InputGradePage);
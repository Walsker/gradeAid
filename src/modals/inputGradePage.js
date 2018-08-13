// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton} from 'easyGrades/src/common';

export default class InputGradePage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            course: this.props.navigation.getParam('course', {}),
            semesterName: this.props.navigation.getParam('semesterName', "")
        }
    }

    render()
    {
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
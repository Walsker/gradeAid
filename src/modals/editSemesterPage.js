// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton} from 'easyGrades/src/common';

export default class EditSemesterPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            semester: this.props.navigation.getParam('semester', {}),
        };
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
                    title = "Edit Semester"
                />
                    <Text>{this.state.semester.name}</Text>
            </View>
        );
    }
}
// React// React Native imports
import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import IconButton from 'easyGrades/src/common/iconButton';
import CheckList from './components/checkList';

export default class AddCoursePage extends Component
{
    constructor(props)
    {
        super(props);
        
        var types = ["Assignments", "Projects", "Essays", "Quizzes", 
            "Tests", "Midterms", "Labs", "Tutorials", "Discussion Groups", "Final Exam"];
        var emptyList = [];

        for (i in types) { emptyList.push(false); }

        this.state = 
        {
            currentScene: 0,
            assessmentTypes: types,
            checkList: emptyList
        };
    }

    blankScene()
    {
        return(
            <Text>HI</Text>
        );
    }

    courseTitle_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.section}>
                    <TextInput
                        autoCapitalize = 'characters'
                        maxLength = {6}
                        onSubmitEditing = {() => this.nextTextInput.focus()}
                        placeholder = "i.e. COMP"
                        placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                        underlineColorAndroid = {colors.primaryTextColor}
                        returnKeyType = 'next'
                        style = {textStyle.textFieldText}
                    />
                    <Text style = {textStyle.textFieldLabel}>
                        Course Type
                    </Text>
                </View>
                <View style = {containerStyle.section}>
                    <TextInput
                        ref = {input => this.nextTextInput = input}
                        keyboardType = 'numeric'
                        maxLength = {6}
                        placeholder = "i.e. 1405"
                        placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                        underlineColorAndroid = {colors.primaryTextColor}
                        returnKeyType = 'done'
                        style = {textStyle.textFieldText}
                    />
                    <Text style = {textStyle.textFieldLabel}>
                        Course Code
                    </Text>
                </View>
                <View style = {containerStyle.buttonBox}>
                    <Button
                        color = {colors.primaryColor}
                        title = "    Next    "
                        onPress = {() => this.setState(prevState =>
                        {
                            return({currentScene: prevState.currentScene + 1});
                        })}
                    />
                </View>
            </View>
        );
    }

    assessmentTypes_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.section}>
                    <Text style = {textStyle.addCourseText}>What kind of assessments are in your course?{'\n\n'}Select all that apply.</Text>
                </View>
                <View style = {containerStyle.section}>
                    <CheckList 
                        color = {colors.accentColor}
                        fontSize = {22}
                        labels = {this.state.assessmentTypes}
                        values = {this.state.checkList}
                        onItemToggle = {(id) =>
                        {
                            var newArray = this.state.checkList;
                            newArray[id] = !newArray[id];
                            this.setState({checkList: newArray});
                        }}
                    />
                </View>
                <View style = {containerStyle.buttonBox}>
                    <Button
                        color = {colors.primaryColor}
                        title = "    Back    "
                        onPress = {() => this.setState(prevState =>
                        {
                            return({currentScene: prevState.currentScene - 1});
                        })}
                    />
                    <Button
                        color = {colors.primaryColor}
                        title = "    Next    "
                        onPress = {() => this.setState(prevState =>
                        {
                            return({currentScene: prevState.currentScene + 1});
                        })}
                    />
                </View>
            </View>
        );
    }

    render()
    {
        var scenes = [this.courseTitle_SCENE(), this.assessmentTypes_SCENE()];

        return(
            <View style = {containerStyle.default}>
                <View style = {containerStyle.page}>
                    <IconButton
                        type = 'close'
                        size = {30}
                        color = {colors.secondaryTextColor}
                    />
                    {scenes[this.state.currentScene]}
                </View>
            </View>
        );
    }
}
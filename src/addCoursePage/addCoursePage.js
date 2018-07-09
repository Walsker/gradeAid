// React// React Native imports
import React, {Component} from 'react';
import {Button, Picker, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import CheckList from './components/checkList';
import AssessmentDetails from './components/assessmentDetails';

export default class AddCoursePage extends Component
{
    constructor(props)
    {
        super(props);
        
        var types = ["Assignments", "Projects", "Essays", "Quizzes", 
            "Tests", "Midterms", "Labs", "Tutorials", "Discussion Groups", "Final Exam"];
        var emptyList = [];
        var emptyDetails = {};

        for (i in types) 
        {
            emptyList.push(false);
            if (types[i] != "Final Exam")
            {
                emptyDetails[types[i]] = {quantity: 1, weight: 0.0};
            }
            else
            {
                emptyDetails[types[i]] = {weight: 0.0};
            }
        }

        this.state = 
        {
            currentScene: 0,
            assessmentTypes: types,
            selectedTypes: emptyList,
            assessmentDetails: emptyDetails,
            language: ''
        };
    }

    renderBackButton()
    {
        return(
            <Button
                color = {colors.primaryColor}
                title = "    Back    "
                onPress = {() => this.setState(prevState =>
                {
                    return({currentScene: prevState.currentScene - 1});
                })}
            />
        );
    }

    renderForwardButton()
    {
        return(
            <View>
                <Button
                    color = {colors.primaryColor}
                    title = "    Next    "
                    onPress = {() => this.setState(prevState =>
                    {
                        return({currentScene: prevState.currentScene + 1});
                    })}
                />
            </View>
        );
    }

    renderFinishButton()
    {
        return(
            <Button
                color = {colors.primaryColor}
                title = "    Finish    "
                onPress = {() => {this.props.navigation.goBack(); alert("done")}}
            />
        );
    }

    courseTitle_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
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
                <View style = {containerStyle.formSection}>
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
                <View style = {containerStyle.rowBox}>
                    {this.renderForwardButton()}
                </View>
            </View>
        );
    }

    assessmentTypes_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.addCourseText}>What kind of assessments are in your course?{'\n\n'}Select all that apply.</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <CheckList 
                        color = {colors.accentColor}
                        fontSize = {22}
                        labels = {this.state.assessmentTypes}
                        values = {this.state.selectedTypes}
                        onItemToggle = {(id) =>
                        {
                            var newArray = this.state.selectedTypes;
                            newArray[id] = !newArray[id];
                            this.setState({selectedTypes: newArray});
                        }}
                    />
                </View>
                <View style = {containerStyle.rowBox}>
                    {this.renderBackButton()}
                    {this.renderForwardButton()}
                </View>
            </View>
        );
    }

    assessmentDetails_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.addCourseText}>Specify the quantity and total weight of each type of assessment below.{/*{'\n\n'}You can get more specific on the next page.*/}</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <AssessmentDetails
                        assessmentTypes = {this.state.assessmentTypes}
                        selectedTypes = {this.state.selectedTypes}
                        initialInfo = {this.state.assessmentDetails}
                        onInfoChange = {(newData) =>
                        {
                            this.setState({assessmentDetails: newData})
                            console.log(newData);
                        }}
                    />
                </View>
                <View style = {containerStyle.rowBox}>
                    {this.renderBackButton()}
                    {this.renderForwardButton()}
                </View>
            </View>
        );
    }

    // setGoal_SCENE()
    // {
    //     return(
    //         <View style = {containerStyle.form}>
    //             <View style = {containerStyle.formSection}>
    //                 <Text style = {textStyle.addCourseText}>What grade would you like to achieve?</Text>
    //             </View>
    //             <View style = {containerStyle.rowBox}>
    //                 <SelectionGrid
    //                     width = {3}
    //                     height = {4}
    //                 />
    //             </View>
    //             <View style = {containerStyle.rowBox}>
    //                 {this.renderBackButton()}
    //                 {this.renderForwardButton()}
    //             </View>
    //         </View>
    //     );
    // }

    confirmCourse_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.addCourseText}>Confirm your course information below.</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <View style = {containerStyle.card}>
                        <Text style = {textStyle.assessmentGrade}>COMP 1405</Text>
                        <Text style = {textStyle.tileTitle}>Assessments</Text>
                        <Text style = {textStyle.tileTitle}>5 Assignments - 25%</Text>
                        <Text style = {textStyle.tileTitle}>4 Projects - 40%</Text>
                        <Text style = {textStyle.tileTitle}>Final Exam - 35%</Text>
                    </View>
                </View>
                <View style = {containerStyle.formSection}>
                    {this.renderFinishButton()}
                </View>
            </View>
        );
    }

    render()
    {
        var scenes = [this.courseTitle_SCENE(), this.assessmentTypes_SCENE(), this.assessmentDetails_SCENE(), this.confirmCourse_SCENE()];

        return(
            <View style = {containerStyle.default}>
                <View style = {containerStyle.page}>
                    <ScrollView>
                        <View style = {containerStyle.rowBox}>
                            <TouchableOpacity 
                                onPress = {() => this.props.navigation.goBack()}
                                style = {{paddingVertical: 5, paddingHorizontal: 70, marginBottom: -5}}
                            >
                                <Text style = {{fontFamily: 'Lato-Regular', color: colors.secondaryTextColor}}>
                                    I don't want to add a course.
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {scenes[this.state.currentScene]}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
// React Native imports
import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {inputGrade} from 'easyGrades/src/appRedux/actions';

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
            semesterName: this.props.navigation.getParam('semesterName', ""),
            selectedAssessments: [],
            currentScene: 0,
            _selectedAssessmentName: "",
            _grade: 0
        }
    }

    getCourseObject()
    {
        var semesters = this.props.semesters;
        var currentSemester;

        for (i in semesters)
        {
            if (semesters[i].name == this.state.semesterName)
            {
                currentSemester = semesters[i];
                break;
            }
        }
        
        for (i in currentSemester.courses)
        {
            if (currentSemester.courses[i].name == this.state.course.name)
            {
                return {
                    semester: currentSemester,
                    courseNumber: i
                };
            }
        }

        return null;
    }

    createSelectableAssessment(assessmentID)
    {
        var assessment = this.state.course.assessments[assessmentID];

        var buttonStyle = this.state.selectedAssessments[assessmentID] ? styles.selectable_ON : styles.selectable_OFF;
        var labelStyle = this.state.selectedAssessments[assessmentID] ? [textStyle.bold(17, 'center'), {color: 'white'}] : textStyle.regular(18, 'center');

        return(
            <TouchableOpacity 
                key = {assessment.name}
                onPress = {() => {
                    var newList = new Array(this.state.selectedAssessments.length);
                    newList[assessmentID] = !newList[assessmentID];
                    this.setState({selectedAssessments: newList, selectedAssessmentName: assessment.name});
                }}
            >
                <View style = {buttonStyle}>
                    <Text style = {labelStyle}>
                        {assessment.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    completeAssessment(assessmentName, gradeReceived)
    {
        var semesters = this.props.semesters;

        console.log("ABOUT TO COMPLETE ", assessmentName, semesters);
        for (i in this.props.semesters)
        {
            if (semesters[i].name == this.state.semesterName)
            {
                this.props.inputGrade(gradeReceived, assessmentName, this.state.course.name, semesters[i]);
                this.props.navigation.goBack();
            }
        }
    }

    selectAssessment_SCENE()
    {
        var assessmentList = [];
                
        for (i in this.state.course.assessments)
        {
            if (this.state.course.assessments[i].complete == false)
            {
                assessmentList.push(this.createSelectableAssessment(i));
            }
        }

        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.regular(24, 'center')}>Select the assessment which you have completed below.</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    {assessmentList}
                </View>
                <View style = {containerStyle.rowBox}>
                    <Button
                        color = {colors.primaryColor}
                        title = "Next"
                        onPress = {() => 
                        {
                            var assessWasSelected = false;
                            for (i in this.state.selectedAssessments)
                            {
                                if (this.state.selectedAssessments[i] == true)
                                {
                                    assessWasSelected = true;
                                }
                            }

                            if (assessWasSelected == true)
                            {
                                this.setState({currentScene: this.state.currentScene + 1});
                            }
                        }}
                    />
                </View>
            </View>
        );
    }

    inputGrade_SCENE()
    {
        var currentText = "";

        const convertToPercentage = (objectToConvert, fallback) =>
        {
            var attempt = parseFloat(objectToConvert);
            if (Number(attempt) === attempt)
            {
                if (attempt < 0)
                    return 0;
                    
                return attempt;
            }
            else
            {
                return fallback;
            }
        }

        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.regular(24, 'center')}>Input the grade you received below.</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            keyboardType = 'numeric'
                            clearTextOnFocus = {true}
                            placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                            underlineColorAndroid = {colors.primaryTextColor}
                            returnKeyType = 'done'
                            style = {[styles.numberText, {width: 75, textAlign: 'right'}]}
                            onChangeText = {(newText) => currentText = newText}
                            onEndEditing = {() => {
                                this.setState({_grade: convertToPercentage(currentText, this.state._grade)});
                            }}
                        />
                        <Text style = {styles.numberText}>%</Text>
                    </View>
                    <View style = {containerStyle.formSection}>
                        <Button
                            color = {colors.accentColor}
                            title = "    Finish    "
                            onPress = {() => {
                                this.completeAssessment(this.state.selectedAssessmentName, this.state._grade)
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }

    render()
    {
        var scenes = [this.selectAssessment_SCENE(), this.inputGrade_SCENE()];

        return(
            <View style = {containerStyle.page}>
                <ScrollView>
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
                    {scenes[this.state.currentScene]}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    selectable_OFF:
    {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderColor: colors.dividerColor,
        borderWidth: 1
    },
    selectable_ON:
    {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderColor: colors.accentColor,
        backgroundColor: colors.accentColor,
        borderWidth: 1
    }
});

const mapStateToProps = (state) =>
{
    return {semesters: state.semesters};
};
export default connect(mapStateToProps, {inputGrade})(InputGradePage);
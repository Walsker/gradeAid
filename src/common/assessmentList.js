// -----------------------------------------------------------------------------------
// REQUIRED COMPONENTS: Array of assessment objects.
// Example:
//  var assessments = [
//      {name: "Assignment 1", grade: 80},
//      {name: "Assignment 2", grade: 55},
//      {name: "Midterm", grade: 92.2}
//  ]
// -----------------------------------------------------------------------------------

// React Native imports
import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';

// Custom Imports
import {containerStyle, textStyle} from './appStyles';
import ProgressBar from 'easyGrades/src/common/progressBar';

export default class AssessmentList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {length: 0};
    }

    createAssessment(assessmentTitle, grade, id)
    {
        return(
            <View 
                key = {id}
                style = {containerStyle.assessmentCard}
            >
                <View style = {containerStyle.assessmentCardTitle}>
                    <Text style = {textStyle.assessmentTitle}>{assessmentTitle}</Text>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <View style = {containerStyle.assessmentGradeBar}>
                        <ProgressBar 
                            percentage = {grade}
                            listOrder = {id}
                            animationDelay = {500}
                        />
                    </View>
                    <View style = {containerStyle.assessmentGradePercent}>
                        <Text style = {textStyle.assessmentGrade}>{grade + "%"}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render()
    {
        var assessmentComponents = []; //= this.props.assessments.map(assessment => this.createItem(assessment.name, assessment.grade));

        for (var i in this.props.assessments)
        {
            assessmentComponents.push(
                this.createAssessment  (this.props.assessments[i].name, this.props.assessments[i].grade, i)
            );
        }

        return(
            <View style = {containerStyle.assessmentList}>
                {assessmentComponents}
            </View>
        );
    }
}
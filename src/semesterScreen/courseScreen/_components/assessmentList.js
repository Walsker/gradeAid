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
import {Text, TouchableOpacity, View} from 'react-native';

// Custom Imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ProgressBar} from 'easyGrades/src/common';

export default class AssessmentList extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {length: 0};
	}

	createAssessment(assessmentTitle, grade, animationID)
	{
		return(
			<View
				key = {animationID}
				style = {containerStyle.assessmentCard}
			>
				<View style = {containerStyle.assessmentCardTitle}>
					<Text style = {textStyle.regular(20)}>{assessmentTitle}</Text>
				</View>
				<View style = {{flexDirection: 'row'}}>
					<View style = {containerStyle.assessmentGradeBar}>
						<ProgressBar
							percentage = {grade}
							listOrder = {animationID}
							animationDelay = {300}
						/>
					</View>
					<View style = {containerStyle.assessmentGradePercent}>
						<Text style = {textStyle.regular(22)}>{(Math.round(grade*10)/10) + "%"}</Text>
					</View>
				</View>
			</View>
		);
	}

	render()
	{
		var assessmentComponents = [];

		for (i in this.props.assessments)
		{
			if (this.props.assessments[i].complete == true)
			{
				assessmentComponents.push(
					this.createAssessment(this.props.assessments[i].name, this.props.assessments[i].grade, i)
				);
			}
		}

		assessmentComponents.push(
			<View
				key = "Add Assessment Button"
				style = {containerStyle.assessmentCard}
			>
				<View style = {containerStyle.assessmentCardTitle}>
					<TouchableOpacity onPress = {this.props.goToInputGradePage}>
						<Text style = {[textStyle.bold(20, 'center'), {color: colors.primaryColor}]}> + NEW ASSESSMENT</Text>
					</TouchableOpacity>
				</View>
			</View>
		);

		return(
			<View style = {containerStyle.assessmentList}>
				{assessmentComponents}
			</View>
		);
	}
}
// React Native imports
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom Imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ProgressBar} from 'easyGrades/src/common';

class AssessmentList extends Component
{
	createAssessment(assessmentID, animationID)
	{
		return(
			<View
				key = {animationID}
				style = {containerStyle.assessmentCard}
			>
				<View style = {containerStyle.assessmentCardTitle}>
					<Text style = {textStyle.regular(20)}>{this.props.assessments[assessmentID].name}</Text>
				</View>
				<View style = {{flexDirection: 'row'}}>
					<View style = {containerStyle.assessmentGradeBar}>
						<ProgressBar
							percentage = {this.props.assessments[assessmentID].grade}
							listOrder = {animationID}
							animationDelay = {300}
						/>
					</View>
					<View style = {containerStyle.assessmentGradePercent}>
						<Text style = {textStyle.regular(22)}>{(Math.round(this.props.assessments[assessmentID].grade*1000)/10) + "%"}</Text>
					</View>
				</View>
			</View>
		);
	}

	render()
	{
		var assessmentComponents = [];
		var animationCounter = 0;
		for (id in this.props.assessments)
		{
			assessmentComponents.push(
				this.createAssessment(id, animationCounter)
			);
			animationCounter++;
		}

		return(
			<View style = {containerStyle.assessmentList}>
				{assessmentComponents}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	var assessmentsInThisCourse = {};
	for (id in state.assessmentList)
	{
		if (state.assessmentList[id].courseID == state.selectedCourse)
			Object.assign(assessmentsInThisCourse, {[id]: state.assessmentList[id]})
	}

	return {
		assessments: assessmentsInThisCourse
	};
}
export default connect(mapStateToProps)(AssessmentList);
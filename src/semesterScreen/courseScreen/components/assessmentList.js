// React Native imports
import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, Text, TouchableNativeFeedback, View} from 'react-native';

// React Navigation imports
import {withNavigationFocus} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {selectAssessment} from 'gradeAid/src/navDrawer/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

class AssessmentList extends Component
{
	constructor(props)
	{
		super(props);

		this.createAssessment = this.createAssessment.bind(this);
	}

	createAssessment(assessment, animationID)
	{
		return (
			<TouchableNativeFeedback
				key = {animationID}
				background = {TouchableNativeFeedback.Ripple(colors.darkPrimaryColor, false)}
				onPress = {() => {}}
			>
				<View style = 
				{{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 25,
					paddingVertical: 15
				}}>
					<Text style = {textStyle.regular(20)}>{assessment.name}</Text>
					<Text style = {textStyle.regular(20)}>{(Math.round(assessment.grade*1000)/10) + "%"}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}

	render()
	{
		const divider = (id) =>
		{
			return <View key = {id} style = {{backgroundColor: colors.dividerColor, height: 2}}/>;
		}

		let components = [divider(0)];
		this.props.assessments.forEach((assessment, i) =>
		{
			components.push(this.createAssessment(assessment, i+1));
			components.push(divider(-1*(i+1)));
		});

		return (
			<View style = {containerStyle.assessmentList}>
				{/* {this.props.assessments.map((assessment, i) => this.createAssessment(assessment, i))} */}
				{components}
			</View>
		);
	}
}

export default connect(null, {selectAssessment})(withNavigationFocus(AssessmentList));
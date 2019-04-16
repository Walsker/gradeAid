// React Native imports
import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';

// React Navigation imports
import {withNavigationFocus} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {selectAssessment} from 'gradeAid/src/navDrawer/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ProgressBar} from 'gradeAid/src/common';

const INACTIVE_VALUE = 0;
const ACTIVE_VALUE = 1;

class AssessmentList extends Component
{
	constructor(props)
	{
		super(props);

		this.refresh = this.refresh.bind(this);
		this.onPressIn = this.onPressIn.bind(this);
		this.onRelease = this.onRelease.bind(this);
		this.createAssessment = this.createAssessment.bind(this);

		let pressValues = props.assessments.map(() => (new Animated.Value(0)));
		this.state =
		{
			pressValues,
			duration: 75
		};
	}

	refresh()
	{
		for (i in this.props.pressValues)
		{
			Animated.timing(this.props.pressValues[i],
			{
				toValue: INACTIVE_VALUE,
				duration: this.state.duration
			}).start();
		}
	}

	onPressIn(animationID)
	{
		Animated.timing(this.state.pressValues[animationID],
		{
			toValue: ACTIVE_VALUE,
			duration: this.state.duration
		}).start();
	}

	onRelease(animationID, assessmentID)
	{
		Animated.timing(this.state.pressValues[animationID],
		{
			toValue: INACTIVE_VALUE,
			duration: this.state.duration
		}).start();

		if (this.props.active)
		{
			this.props.navigation.navigate("Assessment");
			this.props.selectAssessment(assessmentID);
		}
	}

	createAssessment(assessment, animationID)
	{
		let pressedBackground =
		{
			backgroundColor: this.state.pressValues[animationID].interpolate({
				inputRange: [INACTIVE_VALUE, ACTIVE_VALUE],
				outputRange: [colors.lightPrimaryColor, colors.darkPrimaryColor]
			})
		};

		let nameStyle =
		{
			color: this.state.pressValues[animationID].interpolate({
				inputRange: [INACTIVE_VALUE, ACTIVE_VALUE],
				outputRange: [colors.primaryTextColor, '#FFFFFF']
			})
		};

		return (
			<TouchableWithoutFeedback
				key = {animationID}
				onPressIn = {() => this.onPressIn(animationID)}
				onPressOut = {() => this.onRelease(animationID, assessment._id)}
				onLongPress = {() => alert("HELP")}
				delayPressOut = {50}
			>
				<Animated.View style = {[containerStyle.assessmentCard, pressedBackground]}>
					<View style = {containerStyle.assessmentCardTitle}>
						<Animated.Text style = {[textStyle.regular(20), nameStyle]}>{assessment.name}</Animated.Text>
					</View>
					<View style = {{flexDirection: 'row'}}>
						<View style = {containerStyle.assessmentGradeBar}>
							<ProgressBar
								percentage = {assessment.grade}
								listOrder = {animationID}
								animationDelay = {300}
							/>
						</View>
						<View style = {containerStyle.assessmentGradePercent}>
							<Animated.Text style = {[textStyle.regular(20), nameStyle]}>{(Math.round(assessment.grade*1000) / 10) + "%"}</Animated.Text>
						</View>
					</View>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}

	render()
	{
		if (this.props.isFocused)
			this.refresh();

		return (
			<View style = {containerStyle.assessmentList}>
				{this.props.assessments.map((assessment, i) => this.createAssessment(assessment, i))}
			</View>
		);
	}
}

export default connect(null, {selectAssessment})(withNavigationFocus(AssessmentList));
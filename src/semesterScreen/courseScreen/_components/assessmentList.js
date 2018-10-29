// React Native imports
import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';

// React Navigation imports
import {withNavigationFocus} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {selectAssessment} from 'gradeAid/src/navDrawer/redux/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ProgressBar} from 'gradeAid/src/common';

class AssessmentList extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			INACTIVE_VALUE: 0,
			ACTIVE_VALUE: 1,
			duration: 75
		};
	}

	refresh()
	{
		for (i in this.props.pressValues)
		{
			Animated.timing(this.props.pressValues[i],
			{
				toValue: this.state.INACTIVE_VALUE,
				duration: this.state.duration
			}).start();
		}
	}

	onPressIn(id)
	{
		Animated.timing(this.props.pressValues[id],
		{
			toValue: this.state.ACTIVE_VALUE,
			duration: this.state.duration
		}).start();
	}

	onRelease(id)
	{
		Animated.timing(this.props.pressValues[id],
		{
			toValue: this.state.INACTIVE_VALUE,
			duration: this.state.duration
		}).start();

		if (this.props.active)
		{
			this.props.selectAssessment(id);
			this.props.navigation.navigate("Assessment");
		}
	}

	createAssessment(assessmentID, animationID)
	{
		var pressedBackground =
		{
			backgroundColor: this.props.pressValues[assessmentID].interpolate({
				inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
				outputRange: [colors.lightPrimaryColor, colors.darkPrimaryColor]
			})
		};

		var pressedText =
		{
			color: this.props.pressValues[assessmentID].interpolate({
				inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
				outputRange: [colors.primaryTextColor, '#FFFFFF']
			})
		};

		return(
			<TouchableWithoutFeedback
				key = {animationID}
				onPressIn = {() => this.onPressIn(assessmentID)}
				onPressOut = {() => this.onRelease(assessmentID)}
				delayPressOut = {50}
			>
				<Animated.View style = {[containerStyle.assessmentCard, pressedBackground]}>
					<View style = {containerStyle.assessmentCardTitle}>
						<Animated.Text style = {[textStyle.regular(20), pressedText]}>{this.props.assessments[assessmentID].name}</Animated.Text>
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
							<Animated.Text style = {[textStyle.regular(22), pressedText]}>{(Math.round(this.props.assessments[assessmentID].grade*1000)/10) + "%"}</Animated.Text>
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
	var pressValues = {}
	for (id in state.assessmentList)
	{
		if (state.assessmentList[id].courseID == state.selectedCourse)
		{
			assessmentsInThisCourse[id] = state.assessmentList[id];
			pressValues[id] = new Animated.Value(0);
		}
	}
	
	return {assessments: assessmentsInThisCourse, pressValues};
}
export default connect(mapStateToProps, {selectAssessment})(withNavigationFocus(AssessmentList));
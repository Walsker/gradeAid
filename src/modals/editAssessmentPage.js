// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editAssessment} from 'easyGrades/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, Button, IconButton} from 'easyGrades/src/common';

class EditAssessmentPage extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			name: props.sisterAssessments[props.selectedAssessment].name,
			grade: props.sisterAssessments[props.selectedAssessment].grade * 100
		};
	}

	showAlert(alertType)
	{
		switch (alertType)
		{
			case "No Type Selection Made":

				Alert.alert(
					"No Type Selection",
					"Please be sure to select at least one assessment type.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Name Used":

				Alert.alert(
					"Name Used",
					"You have already used this name on an assessment in this course.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "No Grade Provided":

				Alert.alert(
					"No Grade Inputted",
					"Please enter a valid grade.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Name Required":

				Alert.alert(
					"No Name Provided",
					"Please enter a name for the assessment.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;
		}
	}

	render()
	{
		const convertToPercentage = (string, fallback) =>
		{
			var attempt = parseFloat(string);
			if (Number(attempt) === attempt)
				return (attempt <= 0 ? 0 : attempt);
			else
				return fallback;
		};

		var gradeInput = "";
		return (
			<View style = {containerStyle.default}>
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
						title = "Edit Assessment"
					/>
					<View style = {containerStyle.form}>
						<View style = {containerStyle.formSection}>
							<Text style = {textStyle.regular(24, 'center')}>Enter the correct grade below.</Text>
						</View>
						<View style = {containerStyle.formSection}>
							<View style = {{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
								<TextInput
									keyboardType = 'numeric'
									clearTextOnFocus = {true}
									defaultValue = {this.state.grade == 0 ? "" : this.state.grade.toString()}
									placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
									underlineColorAndroid = {colors.primaryTextColor}
									returnKeyType = 'done'
									style = {[textStyle.regular(28, 'center'), {width: 125}]}
									onChangeText = {(newText) => gradeInput = newText}
									onEndEditing = {() => {
										this.setState({grade: convertToPercentage(gradeInput, this.state.grade)});
									}}
								/>
								<Text style = {textStyle.regular(24)}>%</Text>
							</View>
							<View style = {{marginVertical: 25}}/>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.regular(24, 'center')}>Change the name of your assessment below.</Text>
							</View>
							<View style = {containerStyle.formSection}>
								<TextInput
									maxLength = {25}
									defaultValue = {this.state.name}
									onChangeText = {(newText) => this.setState({name: newText})}
									underlineColorAndroid = {colors.primaryTextColor}
									style = {textStyle.regular(24, 'center')}
								/>
								<Text style = {[textStyle.regular(14, 'center'), {paddingLeft: 3.5}]}>
									Assessment Name
								</Text>
							</View>
							<View style = {containerStyle.formSection}>
								<Button
									label = "Submit Changes"
									color = {colors.accentColor}
									inverted = {false}
									action = {() =>
									{
										if (this.state.name != "")
										{
											for (id in this.props.sisterAssessments)
											{
												if (this.props.sisterAssessments[id].name == this.state.name &&
													id != this.props.selectedAssessment)
												{
													this.showAlert("Name Used");
													return;
												}
											}
										}
										else
										{
											this.showAlert("Name Required");
											return;
										}

										if (this.state.grade === "")
										{
											this.showAlert("No Grade Provided");
											return;
										}

										this.props.editAssessment(this.props.selectedAssessment, {name: this.state.name, grade: this.state.grade / 100});
										this.props.navigation.navigate("Course");
									}}
								/>
							</View>
						</View>
					</View>     
				</ScrollView>           
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	var sisterAssessments = {};
	for (id in state.assessmentList)
	{
		if (state.assessmentList[id].courseID == state.selectedCourse)
			sisterAssessments[id] = state.assessmentList[id];
	}

	return {
		sisterAssessments,
		selectedCourse: state.selectedCourse,
		selectedAssessment: state.selectedAssessment
	};
}
export default connect(mapStateToProps, {editAssessment})(EditAssessmentPage);
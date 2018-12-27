// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editAssessment} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, CheckList, FractionInput, IconButton, TextField} from 'gradeAid/src/common';
import * as Assessment from 'gradeAid/src/semesterScreen/assessmentTypes';

class EditAssessmentPage extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			percentage: props.sisterAssessments[props.selectedAssessment].grade * 100,
			numerator: "",
			denominator: "",
			weight: props.sisterAssessments[props.selectedAssessment].weight * 100,
			name: props.sisterAssessments[props.selectedAssessment].name,
			useFraction: false
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
					"No Grade Entered",
					"Please enter a valid grade.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "No Weight Provided":

				Alert.alert(
					"No Weight Entered",
					"Please enter a valid weight.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Zero Denominator":

				Alert.alert(
					"Invalid Fraction",
					"The denominator cannot be 0.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Negative Values":

				Alert.alert(
					"Negative Values",
					"Please enter positive values",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Missing Values":

				Alert.alert(
					"Missing Values",
					"Please input all required values.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;
		}
	}

	inputGrade()
	{
		var trueWeight = this.state.weight / 100;
		var trueGrade = 0;
		if (this.state.useFraction)
			trueGrade = (this.state.numerator / this.state.denominator);
		else
			trueGrade = (this.state.percentage / 100);

		this.props.editAssessment(this.props.selectedAssessment, {name: this.state.name, grade: trueGrade, weight: trueWeight});
		this.props.navigation.navigate("Course");
	}

	convertToPercentage(string, fallback)
	{
		var attempt = parseFloat(string);
		if (Number(attempt) === attempt)
			return (attempt <= 0 ? 0 : attempt);
		else
			return fallback;
	};

	renderGradeInput()
	{
		if (this.state.useFraction)
		{
			return (
				<FractionInput
					color = {colors.primaryTextColor}
					fontSize = {24}
					label = "Grade"
					blurOnSubmit = {false}
					defaultNumValue = {this.state.numerator == 0 ? "" : this.state.numerator.toString()}
					defaultDenomValue = {this.state.denominator == 0 ? "" : this.state.denominator.toString()}
					onNumChange = {(newText) => {
						this.setState({numerator: this.convertToPercentage(newText, this.state.numerator)});
					}}
					onDenomChange = {(newText) => {
						this.setState({denominator: this.convertToPercentage(newText, this.state.denominator)});
					}}
					onSubmitEditing = {() => this.weightInput.focus()}
					submitKeyType = 'next'
				/>
			);
		}
		else
		{
			return (
				<TextField
					color = {colors.primaryTextColor}
					fontSize = {24}
					label = "Grade (%)"
					textAlign = 'center'
					blurOnSubmit = {false}
					onSubmitEditing = {() => this.weightInput.focus()}
					keyboardType = 'numeric'
					defaultValue = {this.state.percentage}
					returnKeyType = 'next'
					onChangeText = {(newText) => {
						this.setState({percentage: this.convertToPercentage(newText, this.state.percentage)});
					}}
				/>
			);
		}
	}

	render()
	{
		var assessmentTypeNameSng = Assessment.types[this.props.assessmentType];
		var assessmentTypeNamePlr = Assessment.pluralTypes[this.props.assessmentType];

		const scrollToggle = (event) =>
		{
			if (event.nativeEvent.contentOffset.y != 0)
			{
				if (!this.state.scrolled)
					this.setState({scrolled: true})
			}
			else
			{
				if (this.state.scrolled)
					this.setState({scrolled: false})
			}
		}

		return (
			<View style = {containerStyle.default}>
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
				<ScrollView
					keyboardShouldPersistTaps = 'handled'
					onScroll = {scrollToggle}
				>
					<View style = {containerStyle.page}>
						<View style = {containerStyle.form}>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.regular(24, 'center')}>Enter the correct grade below.</Text>
							</View>
							<View style = {containerStyle.formSection}>
								{this.renderGradeInput()}
								<CheckList
									style = {{alignSelf: 'center', paddingVertical: 10, paddingRight: 40}}
									color = {colors.accentColor}
									fontSize = {18}
									labels = {["Use a fraction"]}
									values = {[this.state.useFraction]}
									onItemToggle = {(id) =>
									{
										this.setState({useFraction: !this.state.useFraction});
									}}
								/>
							</View>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.regular(24, 'center')}>Enter the weight of this grade.</Text>
							</View>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.italic(12, 'center', colors.secondaryTextColor)}>
									The total weight of your {assessmentTypeNamePlr.toLowerCase()} should be {this.props.assessmentTypeWeight * 100}%
								</Text>
								<TextField
									ref = {input => this.weightInput = input}
									color = {colors.primaryTextColor}
									fontSize = {24}
									label = "Weight (%)"
									textAlign = 'center'
									blurOnSubmit = {false}
									defaultValue = {this.state.weight == 0 ? "" : this.state.weight.toString()}
									keyboardType = 'numeric'
									onChangeText = {(newText) => {
										this.setState({weight: this.convertToPercentage(newText, this.state.weight)});
									}}
									onSubmitEditing = {() => this.nameInput.focus()}
									returnKeyType = 'next'
								/>
							</View>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.regular(24, 'center')}>Change the name of your {assessmentTypeNameSng.toLowerCase()} below.</Text>
							</View>
							<View style = {containerStyle.formSection}>
								<TextField
									ref = {input => this.nameInput = input}
									color = {colors.primaryTextColor}
									fontSize = {24}
									label = "Assessment Name"
									textAlign = 'center'
									clearTextOnFocus = {true}
									defaultValue = {this.state.name}
									maxLength = {25}
									onChangeText = {(newText) => this.setState({name: newText})}
								/>
							</View>
							<View style = {containerStyle.formSection}>
								<Button
									label = "Submit Changes"
									color = {colors.accentColor}
									inverted = {false}
									action = {() =>
									{
										if (this.state.useFraction)
										{
											if (this.state.numerator === "" || this.state.denominator === "")
											{
												this.showAlert("Missing Values");
												return;
											}
											else if (this.state.denominator == 0)
											{
												this.showAlert("Zero Denominator");
												return;
											}
											else if (this.state.numerator < 0 || this.state.denominator < 0)
											{
												this.showAlert("Negative Values")
												return;
											}
										}
										else
										{
											if (this.state.percentage === "")
											{
												this.showAlert("No Grade Provided");
												return;
											}
											else if (this.state.percentage < 0)
											{
												this.showAlert("Negative Values");
												return;
											}
										}
										
										if (this.state.weight === "")
										{
											this.showAlert("No Weight Provided");
											return;
										}
										else if (this.state.weight < 0)
										{
											this.showAlert("Negative Values");
											return;
										}
										
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

										this.inputGrade();
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

	var assessmentObject = state.assessmentList[state.selectedAssessment];
	return {
		sisterAssessments,
		selectedAssessment: state.selectedAssessment,
		assessmentType: assessmentObject.type,
		assessmentTypeWeight: state.courseList[assessmentObject.courseID].breakdown[assessmentObject.type],
	};
}
export default connect(mapStateToProps, {editAssessment})(EditAssessmentPage);
// React Native imports
import React, {Component} from 'react';
import {Alert, Keyboard, KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {createAssessment} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, CheckList, FractionInput, IconButton, TextField} from 'gradeAid/src/common';

class InputGradeForm extends Component
{
	constructor(props)
	{
		super(props);

		this.showAlert = this.showAlert.bind(this);
		this.completeForm = this.completeForm.bind(this);

		this.state =
		{
			scrolled: false,
			percentage: "",
			numerator: "",
			denominator: "",
			weight: "",
			name: "",
			useFraction: false
		}
	}

	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Name Used":

				Alert.alert(
					"Name Used",
					"You have already used this name on an assessment in this course.",
					[{text: 'OK', onPress: () => this.nameInput.focus()}],
					{cancelable: true}
				);
				return;

			case "No Grade Provided":

				Alert.alert(
					"No Grade Entered",
					"Please enter a valid grade.",
					[{text: 'OK', onPress: () => this.state.useFraction ? this.fGradeInput.focus() : this.pGradeInput.focus()}],
					{cancelable: true}
				);
				return;

			case "No Weight Provided":

				Alert.alert(
					"No Weight Entered",
					"Please enter a valid weight.",
					[{text: 'OK', onPress: () => this.weightInput.focus()}],
					{cancelable: true}
				);
				return;

			case "No Name":

				Alert.alert(
					"No Name Provided",
					"Please give your assessment a name.",
					[{text: 'OK', onPress: () => this.nameInput.focus()}],
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

	completeForm()
	{
		let grade = 0;
		if (this.state.useFraction)
			grade = this.state.numerator / this.state.denominator;
		else
			grade = this.state.percentage;	
		grade /= 100;

		this.props.createAssessment(this.state.name, grade, this.state.weight / 100);
		this.props.navigation.pop();
	}

	render()
	{
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

		const toNumber = (string, fallback) =>
		{
			if (string === "") return "";

			var attempt = parseFloat(string);
			if (Number(attempt) === attempt)
				return attempt;
			else
				return fallback;
		};

		const renderGradeInput = () =>
		{
			let that = this;
			if (this.state.useFraction)
			{
				return (
					<FractionInput
						setRef = {input => this.fGradeInput = input}
						color = {colors.primaryTextColor}
						fontSize = {24}
						label = "Grade"
						blurOnSubmit = {false}
						defaultNumValue = {this.state.numerator == 0 ? "" : this.state.numerator.toString()}
						defaultDenomValue = {this.state.denominator == 0 ? "" : this.state.denominator.toString()}
						onNumChange = {(newText) => {
							this.setState({numerator: toNumber(newText, this.state.numerator)});
						}}
						onDenomChange = {(newText) => {
							this.setState({denominator: toNumber(newText, this.state.denominator)});
						}}
						submitKeyType = 'next'
						onSubmitEditing = {() => this.weightInput.focus()}
					/>
				);
			}
			else
			{
				return (
					<TextField
						setRef = {input => this.pGradeInput = input}
						fontSize = {24}
						label = "Grade (%)"
						textAlign = 'center'
						textColor = {colors.primaryTextColor}
						placeholder = "i.e 75"
						blurOnSubmit = {false}
						keyboardType = 'numeric'
						defaultValue = {this.state.percentage == 0 ? "" : this.state.percentage.toString()}
						returnKeyType = 'next'
						onChangeText = {(newText) => {
							this.setState({percentage: toNumber(newText, this.state.percentage)});
						}}
						onSubmitEditing = {() => this.weightInput.focus()}
					/>
				);
			}
		};

		return (
			<View style = {containerStyle.default}>
				<ActionBar
					inverted = {true}
					lifted = {this.state.scrolled}
					leftButton =
					{
						<IconButton
							type = 'close'
							size = {30}
							color = {colors.primaryColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					title = "Input Grade"
				/>
				<ScrollView
					keyboardShouldPersistTaps = 'handled'
					onScroll = {scrollToggle}
					contentContainerStyle = {containerStyle.page}
				>
					<KeyboardAvoidingView style = {{flex: 1}}>
						<View style = {containerStyle.form}>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.regular(24, 'center')}>Provide a name for your assessment.</Text>
							</View>
							<View style = {containerStyle.formSection}>
								<TextField
									setRef = {input => this.nameInput = input}
									fontSize = {24}
									label = "Name"
									textAlign = 'center'
									textColor = {colors.primaryTextColor}
									clearTextOnFocus = {true}
									maxLength = {25}
									placeholder = "i.e. Assignment 1"
									onChangeText = {(newText) => this.setState({name: newText})}
									onSubmitEditing = {() => this.state.useFraction ? this.fGradeInput.focus() : this.pGradeInput.focus()}
									returnKeyType = 'next'
								/>
							</View>
							<View style = {containerStyle.formSection}>
								<Text style = {textStyle.regular(24, 'center')}>Enter the grade you received below.</Text>
							</View>
							<View style = {containerStyle.formSection}>
								{renderGradeInput()}
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
								<TextField
									setRef = {input => this.weightInput = input}
									fontSize = {24}
									label = "Weight (%)"
									placeholder = "i.e. 5"
									textAlign = 'center'
									textColor = {colors.primaryTextColor}
									blurOnSubmit = {false}
									keyboardType = 'numeric'
									onChangeText = {(newText) => {
										this.setState({weight: toNumber(newText, this.state.weight)});
									}}
									onSubmitEditing={Keyboard.dismiss} 
									returnKeyType = 'done'
								/>
							</View>
							<View style = {containerStyle.formSection}>
								<Button
									label = "Submit"
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

										if (this.state.name == "")
										{
											this.showAlert("No Name");
											return;
										}
										else
										{
											if (this.props.usedNames.includes(this.state.name))
												this.showAlert("Name Used");
											else
												this.completeForm();
										}
									}}
								/>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	// Getting all the names used in this course
	let {courseList, selectedCourse, assessmentList} = state;
	let usedNames = courseList[selectedCourse].assessments.map(id => assessmentList[id].name);

	return {usedNames};
};
export default connect(mapStateToProps, {createAssessment})(InputGradeForm);
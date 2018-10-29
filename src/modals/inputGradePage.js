// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {createAssessment} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, CheckList, IconButton} from 'gradeAid/src/common';
import * as Assessment from 'gradeAid/src/semesterScreen/assessmentTypes';

class InputGradePage extends Component
{
	constructor(props)
	{
		super(props);

		var checkBoxLabels = [];
		var checkBoxValues = [];
		for (type in props.courseAssessmentTypes)
		{
			checkBoxLabels.push(Assessment.types[props.courseAssessmentTypes[type]]);
			checkBoxValues.push(false);
		}

		this.state =
		{
			checkBoxLabels,
			checkBoxValues,
			currentScene: 0,
			grade: "",
			name: "",
		}
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
		}
	}

	back()
	{
		this.setState(prevState =>
		{
			return({currentScene: prevState.currentScene - 1});
		});
	}

	next()
	{
		this.setState(prevState =>
		{
			return({currentScene: prevState.currentScene + 1});
		});
	}

	inputGrade()
	{
		var selectedType = "";
		for (i in this.state.checkBoxValues)
		{
			if (this.state.checkBoxValues[i])
				selectedType = this.props.courseAssessmentTypes[i];
		}

		var chosenName = this.state.name == "" ? this.createNextName(this.props.courseAssessmentTypes[selectedType]) : this.state.name;

		this.props.createAssessment(selectedType, chosenName, this.props.selectedCourse, parseFloat(this.state.grade) / 100);
		this.props.navigation.pop();
	}

	createNextName(type)
	{
		if (type == Assessment.FINAL_EXAM)
			return Assessment.types[Assessment.FINAL_EXAM];

		var numberOfSameTypeAssessments = 0;
		for (id in this.props.sisterAssessments)
		{
			if (type == this.props.sisterAssessments[id].type)
				numberOfSameTypeAssessments++;
		}
		return Assessment.types[type] + " " + (numberOfSameTypeAssessments + 1).toString();
	}

	selectAssessType_SCENE()
	{
		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(22, 'center')}>Select the type of assessment you have completed.</Text>
				</View>
				<View style = {containerStyle.formSection}>
					<CheckList
						color = {colors.accentColor}
						fontSize = {22}
						labels = {this.state.checkBoxLabels}
						values = {this.state.checkBoxValues}
						onItemToggle = {(id) =>
						{
							var newArray = [];
							for (i in this.state.checkBoxValues)
								newArray.push(false);

							newArray[id] = true;
							this.setState({checkBoxValues: newArray});
						}}
					/>
				</View>
				<View style = {containerStyle.rowBox}>
					<Button
						label = "Next"
						color = {colors.primaryColor}
						inverted = {false}
						action = {() =>
						{
							var atLeastOneSelected = false;
							var selectedType;
							for (i in this.state.checkBoxValues)
							{
								if (this.state.checkBoxValues[i])
								{
									atLeastOneSelected = true;
									selectedType = i;
									break;
								}
							}

							if (!atLeastOneSelected)
								this.showAlert("No Type Selection Made");
							else
							{
								this.setState({name: this.createNextName(this.props.courseAssessmentTypes[selectedType])});
								this.next()
							}
						}}
					/>
				</View>
			</View>
		);
	}

	inputGrade_SCENE()
	{
		const convertToPercentage = (string, fallback) =>
		{
			var attempt = parseFloat(string);
			if (Number(attempt) === attempt)
				return (attempt <= 0 ? 0 : attempt);
			else
				return fallback;
		};

		var selectedType = "";
		for (i in this.state.checkBoxValues)
		{
			if (this.state.checkBoxValues[i])
				selectedType = Assessment.types[this.props.courseAssessmentTypes[i]];
		}

		var gradeInput = "";
		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(24, 'center')}>Enter the grade you received for the {selectedType.toLowerCase()} below.</Text>
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
						<Text style = {textStyle.regular(24, 'center')}>Provide a name for your {selectedType.toLowerCase()}. {'\n'}(Optional)</Text>
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
							{selectedType} Name
						</Text>
					</View>
					<View style = {containerStyle.formSection}>
						<Button
							label = "Submit"
							color = {colors.accentColor}
							inverted = {false}
							action = {() =>
							{
								if (this.state.name != "")
								{
									for (id in this.props.sisterAssessments)
									{
										if (this.props.sisterAssessments[id].name == this.state.name)
										{
											this.showAlert("Name Used");
											return;
										}
									}
								}

								if (this.state.grade === "")
								{
									this.showAlert("No Grade Provided");
									return;
								}

								this.inputGrade();
							}}
						/>
						<Button
							label = "Back"
							color = {colors.accentColor}
							inverted = {true}
							action = {this.back.bind(this)}
						/>
					</View>
				</View>
			</View>
		);
	}

	render()
	{
		var scenes = [this.selectAssessType_SCENE(), this.inputGrade_SCENE()];

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

const mapStateToProps = (state) =>
{
	var validAssessmentTypes = [];
	var course = state.courseList[state.selectedCourse];
	for (i in course.breakdown)
	{
		if (course.breakdown[i] != 0)
			validAssessmentTypes.push(i);
	}

	var assessmentsInSameCourse = {};
	for (id in state.assessmentList)
	{
		if (state.assessmentList[id].courseID == state.selectedCourse)
			Object.assign(assessmentsInSameCourse, {[id]: state.assessmentList[id]})
	}

	return {
		sisterAssessments: assessmentsInSameCourse,
		courseAssessmentTypes: validAssessmentTypes,
		selectedSemester: state.selectedSemester,
		selectedCourse: state.selectedCourse
	};
};
export default connect(mapStateToProps, {createAssessment})(InputGradePage);
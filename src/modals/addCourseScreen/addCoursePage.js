// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {createCourse} from 'easyGrades/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, Button, IconButton} from 'easyGrades/src/common';
import * as Assessment from 'easyGrades/src/semesterScreen/assessmentTypes';
import CheckList from './_components/checkList';

class AddCoursePage extends Component
{
	constructor(props)
	{
		super(props);

		var pluralAssessTypes = {...Assessment.types};
		for (i in pluralAssessTypes)
		{
			if (pluralAssessTypes[i] == Assessment.types[Assessment.QUIZ])
				pluralAssessTypes[i] += "zes";
			else if (pluralAssessTypes[i] != Assessment.types[Assessment.FINAL_EXAM])
				pluralAssessTypes[i] += "s";
		}

		var selectedTypes = [];
		var markBreakdown = [];

		for (i in Assessment.types)
		{
			selectedTypes.push(false);
			markBreakdown.push(0.0);
		}

		this.state =
		{
			currentScene: 0,
			pluralAssessTypes,
			selectedTypes,
			markBreakdown,
			courseName: ""
		};
	}

	showAlert(alertType, customText)
	{
		switch (alertType)
		{
			case "Cancel Creation":

				Alert.alert(
					"Cancel",
					"Are you sure you would like to cancel the course creation?",
					[
						{text: 'Yes', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
						{text: 'No', onPress: () => {}},
					],
					{cancelable: false}
				);
				return;

			case "Incomplete Course Code":

				Alert.alert(
					"Incomplete",
					"Please be sure to give your course a name.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Course Name Taken":

				Alert.alert(
					"Name Taken",
					"You have already created a course with the same name in this semester.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "No Type Selection Made":

				Alert.alert(
					"No Type Selection",
					"Please be sure to select at least one assessment type.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Breakdown Contains a 0":

				Alert.alert(
					"Breakdown Invalid",
					"\"" + customText + "\" has a percentage of 0.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Breakdown Sum Invalid":

				Alert.alert(
					"Breakdown Invalid",
					"Your breakdown does not add up to 100%",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Weights don't add up":

				Alert.alert(
					"Invalid Weight",
					"Oh no! All the weights don't add up to 100%",
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

	next(extraState)
	{
		this.setState(prevState =>
		{
			return({currentScene: prevState.currentScene + 1, ...extraState});
		});
	}

	courseTitle_SCENE()
	{
		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<TextInput
						autoCapitalize = 'characters'
						maxLength = {15}
						defaultValue = {this.state.courseName}
						onChangeText = {(newText) => this.setState({courseName: newText})}
						placeholder = "i.e. COMP 1405"
						placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
						underlineColorAndroid = {colors.primaryTextColor}
						style = {textStyle.regular(24)}
					/>
					<Text style = {[textStyle.regular(14), {paddingLeft: 3.5}]}>
						Course Name
					</Text>
				</View>
				<View style = {containerStyle.rowBox}>
					<Button
						label = "Next"
						color = {colors.primaryColor}
						inverted = {false}
						action = {() =>
						{
							var nameTaken = false;
							for (id in this.props.courseList)
							{
								if (this.props.courseList[id].semesterID == this.props.selectedSemester &&
									this.props.courseList[id].name == this.state.courseName.trim())
									nameTaken = true;
							}

							if (this.state.courseName == "")
								this.showAlert("Incomplete Course Code");
							else if (nameTaken)
								this.showAlert("Course Name Taken");
							else
								this.next({courseName: this.state.courseName.trim()});
						}}
					/>
				</View>
			</View>
		);
	}

	assessmentTypes_SCENE()
	{
		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(22, 'center')}>What kind of assessments are in your course?{'\n\n'}Select all that apply.</Text>
				</View>
				<View style = {containerStyle.formSection}>
					<CheckList
						color = {colors.accentColor}
						fontSize = {22}
						labels = {this.state.pluralAssessTypes}
						values = {this.state.selectedTypes}
						onItemToggle = {(id) =>
						{
							var newArray = this.state.selectedTypes;
							newArray[id] = !newArray[id];
							this.setState({selectedTypes: newArray});
						}}
					/>
				</View>
				<View style = {containerStyle.rowBox}>
					<Button
						label = "Back"
						color = {colors.primaryColor}
						inverted = {true}
						action = {this.back.bind(this)}
					/>
					<Button
						label = "Next"
						color = {colors.primaryColor}
						inverted = {false}
						action = {() =>
						{
							var atLeastOneSelected = false;
							for (i in this.state.selectedTypes)
							{
								if (this.state.selectedTypes[i])
								{
									atLeastOneSelected = true;
									break;
								}
							}

							if (!atLeastOneSelected)
								this.showAlert("No Type Selection Made");
							else
								this.next()
						}}
					/>
				</View>
			</View>
		);
	}

	markBreakdown_SCENE()
	{
		const convertToPercentage = (string, fallback) =>
		{
			var attempt = parseFloat(string);
			if (Number(attempt) === attempt)
			{
				if (attempt > 100)
					return 100;
				else if (attempt < 0)
					return 0;
				return attempt;
			}
			else
				return fallback;
		};

		const createTypeSpecificaiton = (type) =>
		{
			var input = "";
			return (
				<View
					style =
					{[
						containerStyle.rowBox,
						{alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20}
					]}
					key = {type}
				>
					<Text style = {textStyle.regular(25, 'left')}>{this.state.pluralAssessTypes[type]}</Text>
					<View style = {{flexDirection: 'row', alignItems: 'center'}}>
						<TextInput
							keyboardType = 'numeric'
							// clearTextOnFocus = {true}
							defaultValue = {this.state.markBreakdown[type] == 0 ? '' : this.state.markBreakdown[type].toString()}
							placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
							underlineColorAndroid = {colors.primaryTextColor}
							returnKeyType = 'done'
							style = {[textStyle.regular(25, 'right'), {width: 75}]}
							onChangeText = {(newInput) => input = newInput}
							onEndEditing = {() =>
							{
								var breakdown = this.state.markBreakdown;
								var newPercentage = convertToPercentage(input, this.state.markBreakdown[type]);
								breakdown[type] = newPercentage;
								this.setState({markBreakdown: breakdown});
							}}
						/>
						<Text style = {textStyle.regular(18)}>%</Text>
					</View>
				</View>
			);
		};

		var breakdownInput = [];
		for (i in this.state.selectedTypes)
		{
			if (this.state.selectedTypes[i])
				breakdownInput.push(createTypeSpecificaiton(i));
		}

		var breakdownSum = 0;
		for (i in this.state.markBreakdown)
		{
			if (this.state.selectedTypes[i])
			{
				breakdownSum += this.state.markBreakdown[i];
			}
		}

		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(22, 'center')}>Specify the mark breakdown below.</Text>
				</View>
				<View style = {containerStyle.formSection}>
					<ScrollView>
						{breakdownInput}
					</ScrollView>
				</View>
				<View style = {containerStyle.formSection}>
					<Text style = {[textStyle.regular(14, 'center'), {color: colors.secondaryTextColor}]}>
						Sum: {breakdownSum}%
					</Text>
				</View>
				<View style = {containerStyle.rowBox}>
					<Button
						label = "Back"
						color = {colors.primaryColor}
						inverted = {true}
						action = {this.back.bind(this)}
					/>
					<Button
						label = "Next"
						color = {colors.primaryColor}
						inverted = {false}
						action = {() =>
						{
							var noneLeftBlank = true;
							var violator = "";
							for (i in this.state.selectedTypes)
							{
								if (this.state.selectedTypes[i] && this.state.markBreakdown[i] == 0)
								{
									noneLeftBlank = false;
									violator = this.state.pluralAssessTypes[i];
									break;
								}
							}

							if (!noneLeftBlank)
								this.showAlert("Breakdown Contains a 0", violator);
							else if (breakdownSum != 100)
								this.showAlert("Breakdown Sum Invalid");
							else
								this.next();
						}}
					/>
				</View>
			</View>
		);
	}

	confirmCourse_SCENE()
	{
		var breakdownComponents = [];
		for (i in this.state.selectedTypes)
		{
			if (this.state.selectedTypes[i])
			{
				breakdownComponents.push(
					<View key = {i}>
						<Text style = {textStyle.regular(20)}>
							{this.state.pluralAssessTypes[i] + " - " + this.state.markBreakdown[i] + "%"}
						</Text>
					</View>
				);
			}
		}

		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(22, 'center')}>Verify your course information below.</Text>
				</View>
				<View style = {containerStyle.formSection}>
					<View style = {[containerStyle.courseCard, {alignItems: 'center'}]}>
						<Text style = {textStyle.bold(22)}>{this.state.courseName}</Text>
						<View style = {{paddingVertical: 10}}>
							<Text style = {[textStyle.regular(18), {fontFamily: 'Lato-Light'}]}>Mark Breakdown</Text>
						</View>
						{breakdownComponents}
					</View>
				</View>
				<View style = {containerStyle.formSection}>
					<Button
						label = "Create Course"
						color = {colors.accentColor}
						inverted = {false}
						action = {() =>
						{
							this.props.createCourse(this.props.courseName, this.props.selectedSemester, this.state.markBreakdown);
							this.props.navigation.pop();
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
		);
	}

	render()
	{
		const scenes = [this.courseTitle_SCENE(), this.assessmentTypes_SCENE(), this.markBreakdown_SCENE(), this.confirmCourse_SCENE()];

		const backButton = () =>
		{
			if (this.state.courseName == "")
				this.props.navigation.goBack()
			else
				this.showAlert("Cancel Creation");
		}

		return(
			<View style = {containerStyle.page}>
					<ActionBar
						inverted = {true}
						leftButton =
						{
							<IconButton
								type = 'arrow-back'
								size = {30}
								color = {colors.primaryColor}
								action = {backButton}
							/>
						}
						title = "Add Course"
					/>
				<ScrollView>
					{scenes[this.state.currentScene]}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		selectedSemester: state.selectedSemester,
		courseList: state.courseList
	};
}
export default connect(mapStateToProps, {createCourse})(AddCoursePage);
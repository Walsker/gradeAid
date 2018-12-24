// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {createCourse} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, CheckList, Divider, IconButton} from 'gradeAid/src/common';
import * as Assessment from 'gradeAid/src/semesterScreen/assessmentTypes';

class AddCoursePage extends Component
{
	constructor(props)
	{
		super(props);

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
			courseName: "",
			selectedTypes,
			markBreakdown
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
			
			case "Incomplete Course Name":

				Alert.alert(
					"No Name Provided",
					"Please enter a name for your course.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Course Name Used":

				Alert.alert(
					"Name Used",
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
						autoFocus = {true}
						autoCapitalize = 'characters'
						maxLength = {15}
						defaultValue = {this.state.courseName}
						onChangeText = {(newText) => this.setState({courseName: newText})}
						placeholder = "i.e. COMP 1405"
						placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
						underlineColorAndroid = {colors.primaryTextColor}
						style = {textStyle.regular(24, 'center')}
					/>
					<Text style = {textStyle.regular(14, 'center')}>
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
							var nameUsed = false;
							for (id in this.props.courseList)
							{
								if (this.props.courseList[id].semesterID == this.props.selectedSemester &&
									this.props.courseList[id].name == this.state.courseName.trim())
									nameUsed = true;
							}

							if (this.state.courseName == "")
								this.showAlert("Incomplete Course Name");
							else if (nameUsed)
								this.showAlert("Course Name Used");
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
				<Divider color = {colors.dividerColor} style = {{marginVertical: 0}}/>
				<View style = {containerStyle.formSection}>
					<CheckList
						color = {colors.accentColor}
						fontSize = {22}
						labels = {Assessment.pluralTypes}
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
				return (attempt <= 0 ? 0 : attempt);
			else
				return fallback;
		};

		const createTypeSpecificaiton = (type) =>
		{
			var input = "";
			return (
				<View
					key = {type}
					style =
					{[
						containerStyle.rowBox,
						{
							alignItems: 'center',
							justifyContent: 'space-between',
							marginVertical: 0
						}
					]}
				>
					<Text style = {textStyle.regular(25, 'left')}>{Assessment.pluralTypes[type]}</Text>
					<View style = {{flexDirection: 'row', alignItems: 'center'}}>
						<TextInput
							keyboardType = 'numeric'
							clearTextOnFocus = {true}
							defaultValue = {this.state.markBreakdown[type] == 0 ? "" : this.state.markBreakdown[type].toString()}
							placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
							underlineColorAndroid = {colors.primaryTextColor}
							returnKeyType = 'done'
							style = {[textStyle.regular(25, 'right'), {width: 75}]}
							onChangeText = {(newInput) =>
							{
								input = (newInput == "" ? 0 : newInput);
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
				<Divider color = {colors.dividerColor}/>
				<View style = {containerStyle.formSection}>
					<ScrollView>
						{breakdownInput}
					</ScrollView>
				</View>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(14, 'center', colors.secondaryTextColor)}>
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
									violator = Assessment.pluralTypes[i];
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
					<View key = {i} style = {{marginVertical: 5}}>
						<Text style = {textStyle.regular(24, 'center')}>
							{Assessment.pluralTypes[i] + " - " + this.state.markBreakdown[i] + "%"}
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
					<Text style = {textStyle.bold(42, 'center', colors.primaryColor)}>{this.state.courseName}</Text>
					<View style = {{paddingVertical: 10}}>
						<Text style = {textStyle.light(24, 'center', colors.darkPrimaryColor)}>Mark Breakdown</Text>
					</View>
				</View>
				<View style = {containerStyle.formSection}>
					<View style = {containerStyle.courseCard}>
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
							this.props.createCourse(this.state.courseName, this.props.selectedSemester, this.state.markBreakdown.map((x) => x / 100));
							this.props.navigation.navigate("Semester Screen");
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
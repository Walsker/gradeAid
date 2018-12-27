// React Native imports
import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editCourse} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, Divider, IconButton, TextField} from 'gradeAid/src/common';
import * as Assessment from 'gradeAid/src/semesterScreen/assessmentTypes';

class EditCoursePage extends Component
{
	constructor(props)
	{
		super(props);

		var course = props.courseList[props.selectedCourse];

		var selectedTypes = [];

		for (i in course.breakdown)
		{
			selectedTypes.push((course.breakdown[i] != 0));
		}

		this.state =
		{
			currentScene: 0,
			courseName: course.name,
			selectedTypes,
			markBreakdown: course.breakdown.map((x) => x * 100),
			scrolled: false
		}
	}

	showAlert(alertType, customText)
	{
		switch (alertType)
		{
			case "Cancel Editing":

				Alert.alert(
					"Cancel",
					"Are you sure you would like to cancel? Your changes will not be saved.",
					[
						{text: 'Yes', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
						{text: 'No', onPress: () => {}},
					],
					{cancelable: true}
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

	scrollToggle(event)
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
		const submit = () =>
		{
			var nameUsed = false;
			for (id in this.props.courseList)
			{
				if (this.props.courseList[id].semesterID == this.props.selectedSemester &&
					this.props.courseList[id].name == this.state.courseName.trim() &&
					id != this.props.selectedCourse)
					nameUsed = true;
			}

			if (this.state.courseName == "")
				this.showAlert("Incomplete Course Name");
			else if (nameUsed)
				this.showAlert("Course Name Used");
			else
				this.next({courseName: this.state.courseName.trim()});
		};

		return(
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<TextField
						fontSize = {24}
						label = "Course Name"
						textAlign = 'center'
						autoFocus = {true}
						autoCapitalize = 'characters'
						maxLength = {15}
						defaultValue = {this.state.courseName}
						onChangeText = {(newText) => this.setState({courseName: newText})}
						onSubmitEditing = {submit}
						placeholder = "i.e. COMP 1405"
						placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
						underlineColorAndroid = {colors.primaryTextColor}
					/>
				</View>
				<View style = {containerStyle.rowBox}>
					<Button
						label = "Next"
						color = {colors.primaryColor}
						inverted = {false}
						action = {submit}
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
				<TextField
					key = {type}
					fontSize = {24}
					label = {Assessment.pluralTypes[type] + " (%)"}
					textAlign = 'center'
					color = {colors.primaryTextColor}
					keyboardType = 'numeric'
					defaultValue = {this.state.markBreakdown[type].toString()}
					returnKeyType = 'done'
					onChangeText = {(newInput) =>
					{
						input = (newInput == "" ? 0 : newInput);
						var breakdown = this.state.markBreakdown;
						var newPercentage = convertToPercentage(input, this.state.markBreakdown[type]);
						breakdown[type] = newPercentage;
						this.setState({markBreakdown: breakdown});
					}}
				/>
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
			<ScrollView
				keyboardShouldPersistTaps = 'handled'
				onScroll = {this.scrollToggle.bind(this)}
			>
				<KeyboardAvoidingView behavior = 'position'> 
					<View style = {containerStyle.form}>
						<View style = {containerStyle.formSection}>
							<Text style = {textStyle.regular(22, 'center')}>Specify the mark breakdown below.</Text>
						</View>
						<Divider color = {colors.dividerColor}/>
						<View style = {containerStyle.formSection}>
							{breakdownInput}
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
				</KeyboardAvoidingView>
			</ScrollView>
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
					<View style = {containerStyle.roundedBox}>
						{breakdownComponents}
					</View>
				</View>
				<View style = {containerStyle.formSection}>
					<Button
						label = "Submit Changes"
						color = {colors.accentColor}
						inverted = {false}
						action = {() =>
						{
							var breakdown = [];
							for (i in this.state.selectedTypes)
							{
								if (this.state.selectedTypes[i])
									breakdown.push(this.state.markBreakdown[i] / 100);
								else
									breakdown.push(0.0);
							}
							
							this.props.editCourse(this.props.selectedCourse, {name: this.state.courseName, breakdown});
							this.props.navigation.navigate("Course");
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
		const scenes = [this.courseTitle_SCENE(), this.markBreakdown_SCENE(), this.confirmCourse_SCENE()];

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
							action = {() => this.showAlert("Cancel Editing")}
						/>
					}
					title = "Edit Course"
				/>
				<View style = {containerStyle.default}>
					{scenes[this.state.currentScene]}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		courseList: state.courseList,
		selectedSemester: state.selectedSemester,
		selectedCourse: state.selectedCourse
	};
}
export default connect(mapStateToProps, {editCourse})(EditCoursePage)
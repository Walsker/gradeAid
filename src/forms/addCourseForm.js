// React Native imports
import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {addCourse, createCourse} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, Divider, IconButton, TextField} from 'gradeAid/src/common';

class AddCourseForm extends Component
{
	constructor(props)
	{
		super(props);

		this.showAlert = this.showAlert.bind(this);
		this.scrollToggle = this.scrollToggle.bind(this);
		this.back = this.back.bind(this);
		this.next = this.next.bind(this);
		this.courseTitle_SCENE = this.courseTitle_SCENE.bind(this);
		this.markBreakdown_SCENE = this.markBreakdown_SCENE.bind(this);
		this.confirmCourse_SCENE = this.confirmCourse_SCENE.bind(this);

		this.state =
		{
			currentScene: 0,
			courseName: "",
			markBreakdown: {},
			scrolled: false
		};
	}

	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Cancel Creation":

				Alert.alert(
					"Cancel",
					"Are you sure you would like to cancel the course creation?",
					[
						{text: 'Yes', onPress: () => this.props.navigation.pop(), style: 'cancel'},
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

			case "Breakdown Incomplete":

				Alert.alert(
					"Breakdown Invalid",
					"Please be sure to give names to all your categories.",
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
			return {currentScene: prevState.currentScene - 1};
		});
	}

	next(extraState)
	{
		this.setState(prevState =>
		{
			return {currentScene: prevState.currentScene + 1, ...extraState};
		});
	}

	courseTitle_SCENE()
	{
		const submit = () =>
		{
			if (this.state.courseName == "")
				this.showAlert("Incomplete Course Name");
			else if (this.props.usedCourseNames.includes(this.state.courseName))
				this.showAlert("Course Name Used");
			else
				this.next({courseName: this.state.courseName.trim()});
		};

		return (
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<TextField
						fontSize = {24}
						label = "Course Code"
						textAlign = 'center'
						textColor = {colors.primaryTextColor}
						autoFocus = {true}
						autoCapitalize = 'characters'
						maxLength = {15}
						defaultValue = {this.state.courseName}
						onChangeText = {(newText) => this.setState({courseName: newText})}
						onSubmitEditing = {submit}
						placeholder = "i.e. COMP 1405"
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
		let categoryExamples = ["Assignments", "Midterm", "Final Exam"];
		let weightExamples = [30, 20, 50];
		let breakdownSum = Object.keys(this.state.markBreakdown).reduce((sum, id) => sum + this.state.markBreakdown[id].weight, 0);

		// A function that converts text input into a percentage
		const convertToPercentage = (string, fallback) =>
		{
			let attempt = parseFloat(string);
			if (Number(attempt) === attempt)
				return (attempt <= 0 ? 0 : attempt);
			else
				return fallback;
		};

		// A function that creates a slot for the mark breakdown
		const createCategory = () =>
		{
			// Finding an ID that's a larger number than all the others
			let IDs = Object.keys(this.state.markBreakdown);
			let nextID = IDs.reduce((a, b) => b > a ? b : a, 0);
			if (IDs.length != 0) nextID++;

			// Creating a slot in state for this input
			this.setState(prevState =>
			{
				return {
					markBreakdown: {
						...prevState.markBreakdown,
						[nextID]: {
							name: "",
							weight: 0
						}
					}
				};
			});
		};

		// A function that deletes a slot in the mark breakdown
		const deleteCategory = (id) =>
		{
			this.setState(prevState =>
			{
				let newBreakdown = {};
				Object.keys(prevState.markBreakdown).forEach(slot =>
				{
					if (slot != id)
						newBreakdown[slot] = prevState.markBreakdown[slot];
				});
				return {markBreakdown: newBreakdown};
			});
		};

		// A function that creates a component to edit a section of the mark breakdown
		const createInputComponent = (id) =>
		{
			return (
				<View
					key = {id}
					style = {{
						flex: 1,
						flexDirection: 'row',
						marginLeft: -10
					}}
				>
					<View style = {{flex: 1}}>
						<IconButton
							type = 'remove-circle-outline'
							size = {30}
							color = {colors.primaryColor}
							action = {() => deleteCategory(id)}
						/>
					</View>
					<View style = {{flex: 4}}>
						<TextField
							defaultValue = {this.state.markBreakdown[id] ? this.state.markBreakdown[id].name : ""}
							fontSize = {24}
							label = "Category"
							maxLength = {20}
							onChangeText = {(newText) => 
							{
								let breakdown = this.state.markBreakdown;
								breakdown[id].name = newText;
								this.setState({markBreakdown: breakdown})
							}}
							placeholder = {categoryExamples[id] ? "i.e. " + categoryExamples[id] : ""}
							returnKeyType = 'next'
							textAlign = 'center'
							textColor = {colors.primaryTextColor}
						/>
					</View>
					<View style = {{flex: 2}}>
						<TextField
							defaultValue = {this.state.markBreakdown[id].weight == 0 ? "" : this.state.markBreakdown[id].weight.toString()}
							fontSize = {24}
							keyboardType = 'numeric'
							label = "Weight (%)"
							onChangeText = {(newInput) =>
							{
								input = (newInput == "" ? "0" : newInput);
								let breakdown = this.state.markBreakdown;
								let percentage = convertToPercentage(input, this.state.markBreakdown[id].weight);
								breakdown[id].weight = percentage;
								this.setState({markBreakdown: breakdown});
							}}
							placeholder = {weightExamples[id] ? weightExamples[id].toString() : ""}
							returnKeyType = 'done'
							textAlign = 'center'
							textColor = {colors.primaryTextColor} 
						/>
					</View>
				</View>
			);
		};

		return (
			<ScrollView
				keyboardShouldPersistTaps = 'handled'
				onScroll = {this.scrollToggle}
			>
				<KeyboardAvoidingView style = {{flex: 1}}>
					<View style = {containerStyle.form}>
						<View style = {containerStyle.formSection}>
							<Text style = {textStyle.regular(22, 'center')}>(Optional){'\n'}Specify the mark breakdown below.</Text>
						</View>
						<Divider color = {colors.dividerColor}/>
						<View style = {containerStyle.formSection}>
							{Object.keys(this.state.markBreakdown).map(id => createInputComponent(id))}
						</View>
						<View style = {containerStyle.formSection}>
							{
								Object.keys(this.state.markBreakdown).length != 0 ? 
									<View style = {containerStyle.formSection}>
										<Text style = {textStyle.regular(14, 'center', colors.secondaryTextColor)}>
											Sum: {breakdownSum}%
										</Text>
									</View>
								: 
									<View/>
							}
							<Button
								label = "Add Category"
								color = {colors.primaryColor}
								inverted = {true}
								action = {createCategory}
							/>
						</View>
						<View style = {containerStyle.rowBox}>
							<Button
								label = "Back"
								color = {colors.primaryColor}
								inverted = {true}
								action = {this.back}
							/>
							<Button
								label = "Next"
								color = {colors.primaryColor}
								inverted = {false}
								action = {() =>
								{
									if (Object.keys(this.state.markBreakdown).length == 0)
									{
										this.next();
										return;
									}

									let properCategories = true;
									for (id in this.state.markBreakdown)
									{
										if (this.state.markBreakdown[id].name == "")
										{
											properCategories = false;
											break;
										}
									}

									if (!properCategories)
										this.showAlert("Breakdown Incomplete");
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
		let breakdownComponents = Object.keys(this.state.markBreakdown).map(id =>
		{
			let component = this.state.markBreakdown[id];
			return (
				<View
					key = {id}
					style = {{marginVertical: 5}}
				>
					<Text style = {textStyle.regular(24, 'center')}>
						{component.name} - {component.weight.toString()}%
					</Text>
				</View>
			);
		});

		return (
			<View style = {containerStyle.form}>
				<View style = {containerStyle.formSection}>
					<Text style = {textStyle.regular(22, 'center')}>Verify your course information below.</Text>
				</View>
				<View style = {containerStyle.formSection}>
					<View style = {{paddingVertical: 10}}>
						<Text style = {textStyle.light(22, 'center', colors.darkPrimaryColor)}>Course Code</Text>
					</View>
					<Text style = {textStyle.bold(42, 'center', colors.primaryColor)}>{this.state.courseName}</Text>
				</View>
				{
					breakdownComponents.length == 0 ? <View/> :
					<View style = {containerStyle.formSection}>
						<View style = {{paddingVertical: 10}}>
							<Text style = {textStyle.light(24, 'center', colors.darkPrimaryColor)}>Mark Breakdown</Text>
						</View>
						<View style = {containerStyle.roundedBox}>
							{breakdownComponents}
						</View>
					</View>
				}
				<View style = {containerStyle.formSection}>
					<Button
						label = "Create Course"
						color = {colors.accentColor}
						inverted = {false}
						action = {() =>
						{
							let breakdown = Object.keys(this.state.markBreakdown).map(id => {
								return {
									name: this.state.markBreakdown[id].name,
									weight: this.state.markBreakdown[id].weight / 100
								};
							});
							
							this.props.navigation.pop();
							this.props.createCourse(this.state.courseName, breakdown);
						}}
					/>
					<Button
						label = "Back"
						color = {colors.primaryColor}
						inverted = {false}
						action = {this.back}
					/>
				</View>
			</View>
		);
	}

	render()
	{
		const scenes = [this.courseTitle_SCENE(), this.markBreakdown_SCENE(), this.confirmCourse_SCENE()];

		const backButton = () =>
		{
			if (this.state.courseName == "")
				this.props.navigation.pop()
			else
				this.showAlert("Cancel Creation");
		}

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
							action = {backButton}
						/>
					}
					title = "Add Course"
				/>
				<View style = {containerStyle.page}>
					{scenes[this.state.currentScene]}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	// Getting all the course names used in this semester
	let {semesterList, selectedSemester, courseList} = state;
	let usedCourseNames = semesterList[selectedSemester].courses.map(id => courseList[id].name);

	console.log(usedCourseNames);
	return {usedCourseNames};
}
export default connect(mapStateToProps, {addCourse, createCourse})(AddCourseForm);
// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editSemester} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton, TextField, Tile} from 'gradeAid/src/common';
import CourseList from './components/courseList';

class SemesterPage extends Component
{
	constructor(props)
	{
		super(props);

		this.changeSemesterName = this.changeSemesterName.bind(this);
		this.createCourse = this.createCourse.bind(this);
		this.noSemester_SCENE = this.noSemester_SCENE.bind(this);
		this.newSemester_SCENE = this.newSemester_SCENE.bind(this);
		this.semester_SCENE = this.semester_SCENE.bind(this);

		this.state =
		{
			editable: false,
			newSemesterName: props.semester.name
		};
	}

	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Unnamed Semester":

				Alert.alert(
					"Incomplete",
					"Please be sure to give the semester a name.",
					[
						{text: 'OK', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;

			case "Semester already exists":

				Alert.alert(
					"Semester Name Taken",
					"Please give the semester a different name.",
					[
						{text: 'OK', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;
		}
	}

	componentDidUpdate()
	{
		this.props.navigation.closeDrawer();
	}

	createCourse()
	{
		// this.setState({editable: false}); // TODO: Make this work without causing the form to backtrack
		this.props.navigation.navigate("AddCourseForm");
	}

	changeSemesterName()
	{
		let semesterName = this.state.newSemesterName.trim();

		if (semesterName == this.props.semester.name)
			this.setState({editable: false});
		else if (semesterName == "")
			this.showAlert("Unnamed Semester");
		else if (this.props.isNameUsed(semesterName))
			this.showAlert("Semester already exists");
		else
		{
			this.props.editSemester(this.props.semester._id, {name: semesterName});
			this.setState({editable: false, newSemesterName: semesterName});
		}
	}

	noSemester_SCENE()
	{
		return (
			<View style = {containerStyle.default}>
				<ActionBar
					color = {colors.spaceColor}
					leftButton =
					{
						<IconButton
							type = 'menu'
							size = {30}
							color = {colors.primaryColor}
							action = {this.props.navigation.openDrawer}
						/>
					}
				/>
				<View style = {containerStyle.page}>
					<View style = {{flex: 1, justifyContent: 'center', padding: 50, paddingTop: -56}}>
						<Text style = {textStyle.regular(16, 'center')}>
							Get started by pressing that button right there.
						</Text>
						<View style = {{marginVertical: 20}}/>
						<Button
							label = "Start Semester"
							color = {colors.primaryColor}
							inverted = {false}
							action = {() => this.props.navigation.navigate("NewSemesterForm")}
						/>
					</View>
				</View>
			</View>
		);
	}

	newSemester_SCENE()
	{
		return (
			<View style = {containerStyle.tileList}>
				<Tile title = "No Courses">
					<View style = {{marginVertical: 5}}/>
					<Text style = {textStyle.regular(16, 'center')}>
						You have no courses in this semester!
					</Text>
					<View style = {{marginVertical: 5}}/>
					<Button
						label = "Add Course"
						color = {colors.darkPrimaryColor}
						inverted = {false}
						action = {this.createCourse}
					/>
				</Tile>
			</View>
		);
	}

	semester_SCENE()
	{
		let averageString = ((this.props.semester.average * 100).toFixed()).toString();
		let averageTile = 
		(
			this.props.semester.average == -1 ? <View/> : 
			<Tile title = "Semester Average">
				<View style = {{marginVertical: -25}}>
					<Text style = {textStyle.bold(150, 'center')}>
						{averageString}
						<Text style = {textStyle.bold(75, 'center')}>%</Text>
					</Text>
				</View>
			</Tile>
		);

		return (
			<ScrollView style = {containerStyle.tileList}>
				{averageTile}
				<Tile title = "Courses">
					<CourseList 
						navigation = {this.props.navigation}
						courses = {this.props.semester.courses}
						editable = {this.state.editable}
						stopEditing = {() => this.setState({editable: false})}
					/>
					<Button
						label = "Add Course"
						color = {colors.darkPrimaryColor}
						inverted = {true}
						action = {this.createCourse}
					/>
				</Tile>
				<View style = {{height: 10}}/>
			</ScrollView>
		);
	}

	render()
	{
		let titleComponent = 
		(
			this.state.editable ?
				<View style = 
				{{
					marginLeft: -4,
					marginBottom: -5
				}}>
					<TextInput
						defaultValue = {this.props.semester.name}
						fontSize = {24}
						textAlign = 'left'
						textColor = '#FFFFFF'
						maxLength = {25}
						placeholder = "Semester Name"
						placeholderTextColor = '#FFFFFF20'
						onChangeText = {(newText) => this.setState({newSemesterName: newText})}
						onSubmitEditing = {this.changeSemesterName}
						returnKeyType = 'done'
						style = {textStyle.thick(24, 'left', '#FFFFFF')}
						underlineColorAndroid = '#FFFFFF'
					/>
				</View>
			: <Text style = {textStyle.thick(24, 'left', '#FFFFFF')}>{this.props.semester.name}</Text>
		);

		if (Object.keys(this.props.semester) == 0) // semester === {}
			return this.noSemester_SCENE();
		else
		{
			return (
				<View style = {containerStyle.default}>
					<ActionBar
						color = {colors.primaryColor}
						leftButton =
						{
							<IconButton
								type = 'menu'
								size = {30}
								color = {colors.titleAndIconColor}
								action = {this.props.navigation.openDrawer}
							/>
						}
						rightButton = {
							<IconButton
								type = {this.state.editable ? 'done' : 'edit'}
								size = {30}
								color = {colors.titleAndIconColor}
								action = {() => 
								{
									if (this.state.editable)
									{
										this.changeSemesterName();
										this.setState({editable: false});
									}
									else
										this.setState({editable: true});
								}}
							/>
						}
					>
						{titleComponent}
					</ActionBar>
					{this.props.emptySemester ? this.newSemester_SCENE() : this.semester_SCENE()}
				</View>
			);
		}
	}
}

const mapStateToProps = (state) =>
{
	console.log("App Store: ", state);

	// Checking if there are any semesters to display
	if (state.selectedSemester == -1) return {semester: {}};

	// Finding the semester object in the store
	let semesterObject = state.semesterList[state.selectedSemester];

	// Getting the course objects related to this semester
	let courses = semesterObject.courses.map(id => state.courseList[id]);

	// Creating a closure that checks if a given semester name is used
	let isNameUsed = (newName) =>
	{
		for (id in state.semesterList)
		{
			if (state.semesterList[id].name == newName)
				return true;
		}
		return false;
	};

	return {
		semester:
		{
			...semesterObject,
			courses			
		},
		emptySemester: courses.length == 0,
		isNameUsed
	};
};
export default connect(mapStateToProps, {editSemester})(SemesterPage);
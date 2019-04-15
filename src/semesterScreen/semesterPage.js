// React Native imports
import React, {Component, PureComponent} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton, Tile} from 'gradeAid/src/common';
import CourseList from './components/courseList';

class SemesterPage extends Component
{
	constructor(props)
	{
		super(props);
		this.createCourse = this.createCourse.bind(this);
		this.editSemester = this.editSemester.bind(this);
		this.noSemester_SCENE = this.noSemester_SCENE.bind(this);
		this.newSemester_SCENE = this.newSemester_SCENE.bind(this);
		this.semester_SCENE = this.semester_SCENE.bind(this);
	}

	componentDidUpdate()
	{
		this.props.navigation.closeDrawer();
	}

	createCourse()
	{
		this.props.navigation.navigate("AddCourseForm");
	}

	editSemester()
	{
		this.props.navigation.navigate("EditSemesterForm");
	}

	noSemester_SCENE()
	{
		return (
			<View style = {containerStyle.default}>
				<ActionBar
					inverted = {true}
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
		let averageTile = 
		(
			this.props.semester.average == -1 ? <View/> : 
			<Tile title = "Semester Average">
				<View style = {{marginVertical: -25}}>
					<Text style = {textStyle.bold(150, 'center')}>{averageString}</Text>
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
		if (Object.keys(this.props.semester) == 0) // semester === {}
			return this.noSemester_SCENE();
		else
		{
			return (
				<View style = {containerStyle.default}>
					<ActionBar
						leftButton =
						{
							<IconButton
								type = 'menu'
								size = {30}
								color = {colors.titleAndIconColor}
								action = {this.props.navigation.openDrawer}
							/>
						}
						title = {this.props.semester.name}
						rightButton = {
							<IconButton
								type = 'edit'
								size = {30}
								color = {colors.titleAndIconColor}
								action = {this.editSemester}
							/>
						}
					/>
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

	return {
		semester:
		{
			...semesterObject,
			courses			
		},
		emptySemester: courses.length == 0
	};
};
export default connect(mapStateToProps)(SemesterPage);
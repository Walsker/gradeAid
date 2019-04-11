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
		this.newCourse = this.newCourse.bind(this);
		this.editSemester = this.editSemester.bind(this);
		this.noSemester_SCENE = this.noSemester_SCENE.bind(this);
		this.newSemester_SCENE = this.newSemester_SCENE.bind(this);
		this.semester_SCENE = this.semester_SCENE.bind(this);
	}

	componentDidUpdate()
	{
		this.props.navigation.closeDrawer();
	}

	newCourse()
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
						action = {this.newCourse}
					/>
				</Tile>
			</View>
		);
	}

	semester_SCENE()
	{
		let averageString = this.props.semester.average ? this.props.semester.average : "~";

		return (
			<ScrollView style = {containerStyle.tileList}>
				<Tile title = "Semester Average">
					<View style = {{marginVertical: -25}}>
						<Text style = {textStyle.bold(150, 'center')}>{averageString}</Text>
					</View>
				</Tile>
				<Tile title = "Courses">
					<CourseList 
						navigation = {this.props.navigation} 
						newCourse = {this.newCourse}
					/>
				</Tile>
				<View style = {{height: 10}}/>
			</ScrollView>
		);
	}

	render()
	{
		if (Object.keys(this.props.semester) == 0)
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

// const mapStateToProps = (state) => ({semester: getSemester(state)});
const completeCourseObject = (courseObject, assessmentList) =>
{
	let preAverage = 0;
	let completion = 0;
	let {assessments} = courseObject;

	// Going through all the course's assessments
	for (i of assessments)
	{
		if (assessmentList[i].hidden) continue;

		// Getting the weight of this assignment
		let weight = courseObject.breakdown[assessmentList[i].type];
		
		completion += weight;
		preAverage += assessmentList[i].grade * weight;
	}

	// Returning the complete course
	return {
		...courseObject,
		average: preAverage / completion,
		emptyCourse: (courseObject.assessments.length == 0 || completion == 0)
	};
};
const mapStateToProps = (state) =>
{
	console.log("App Store: ", state);

	// Checking if there are any semesters to display
	if (state.selectedSemester == -1) return {semester: {}};

	// Finding the semester object in the store
	let semesterObject = state.semesterList[state.selectedSemester];

	// Getting the course objects related to this semester
	let courses = [];
	for (x of semesterObject.courses)
		courses.push(completeCourseObject(state.courseList[x], state.assessmentList));

	// Completing the semester object
	let average = 0;
	let emptySemester = true;
	if (courses.length != 0)
	{
		// Finding out if all the courses don't have assessments
		emptySemester = courses.reduce((allEmpty, targetCourse) => targetCourse.emptyCourse && allEmpty, true);
		
		// Calculating the semester average
		average = courses.reduce((sum, targetCourse) => sum + targetCourse.average);
		average /= courses.length;
	}

	return {
		semester:
		{
			...semesterObject,
			average,
			emptySemester
		}
	};
};
export default connect(mapStateToProps)(SemesterPage);
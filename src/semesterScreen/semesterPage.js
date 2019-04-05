// React Native imports
import React, {Component} from 'react';
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

		// Keeping track of the tentative semester name
		this.state = {_semesterName: ""};
	}

	componentDidUpdate()
	{
		this.props.navigation.closeDrawer();
	}

	newCourse()
	{
		this.props.navigation.navigate("AddCoursePage");
	}

	editSemester()
	{
		this.props.navigation.navigate("EditSemesterPage");
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
						action = {this.newCourse.bind(this)}
					/>
				</Tile>
			</View>
		);
	}

	semester_SCENE()
	{
		averageString = this.props.semester.average;
		var fontSize = 200;
		if (this.props.semester.average == 'X')
		{
			averageString = "N/A";
			fontSize = 175;
		}

		return (
			<ScrollView style = {containerStyle.tileList}>
				<Tile title = "Semester Average">
					<View style = {{marginVertical: -25}}>
						<Text style = {textStyle.bold(fontSize, 'center')}>{averageString}</Text>
					</View>
				</Tile>
				<Tile title = "Courses">
					<CourseList 
						navigation = {this.props.navigation} 
						newCourse = {this.newCourse.bind(this)}
					/>
				</Tile>
				<View style = {{height: 10}}/>
			</ScrollView>
		);
	}

	render()
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
							action = {this.editSemester.bind(this)}
						/>
					}
				/>
				{this.props.newSemester ? this.newSemester_SCENE() : this.semester_SCENE()}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	// Pulling the state values I need
	let {selectedSemester, semesterList, courseList} = state;

	// Finding out if semester has any courses
	let emptySemester = (semesterList[selectedSemester].courses.length == 0);

	let semester = semesterList[state.selectedSemester];
	
	return {
		semester,
		courseList: courseList,
		emptySemester 
	};
}

export default connect(mapStateToProps)(SemesterPage);
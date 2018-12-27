// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton, Tile} from 'gradeAid/src/common';
import CourseList from './_components/courseList';

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
		return(
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
		if (this.props.semester.average == 'X')
			averageString = "N/A";

		return(
			<ScrollView style = {containerStyle.tileList}>
				<Tile title = "Semester Average">
					<View style = {{marginVertical: -25}}>
						<Text style = {textStyle.bold(200)}>{averageString}</Text>
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
		return(
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
	var newSemester = true;

	for (id in state.courseList)
	{
		if (state.courseList[id].semesterID == state.selectedSemester)
		{
			newSemester = false;
			break;
		}
	}

	return {
		semester: state.semesterList[state.selectedSemester],
		courseList: state.courseList,
		newSemester
	};
}

export default connect(mapStateToProps)(SemesterPage);
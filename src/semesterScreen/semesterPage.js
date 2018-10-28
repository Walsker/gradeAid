// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, Button, IconButton, Tile} from 'easyGrades/src/common';
import CourseList from './_components/courseList';

class SemesterPage extends Component
{
	constructor(props)
	{
		super(props);

		// Keeping track of the tentative semester name
		this.state = {_semesterName: ""};
	}

	componentWillUnmount()
	{
		console.log("Unmounting");
		this.state.willFocusSubscription.remove();
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
				<Tile
					title = "No Courses"
					content =
					{
						<View>
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
						</View>
					}
				/>
			</View>
		);
	}

	semester_SCENE()
	{
		var maxGPAString = parseFloat(this.props.maxGPA).toFixed(1);
		var GPAString = parseFloat(this.props.semester.gpa).toFixed(1);

		var showNA = true;
		for (i in this.props.semester.courses)
		{
			if (this.props.semester.courses[i].newCourse == false)
			{
				showNA = false;
			}
		}

		if (showNA == true)
		{
			var GPAString = "N/A";
		}

		return(
			<ScrollView style = {containerStyle.tileList}>
				<Tile title = "Semester Average"
					content =
					{
						<View>
							<View style = {{marginVertical: -25}}>
								<Text style = {textStyle.bold(200)}>{GPAString}</Text>
							</View>
							<Text style = {[textStyle.italic(14, 'center'), {color: colors.secondaryTextColor}]}>out of {maxGPAString}</Text>
						</View>
					}
				/>
				<Tile
					title = "Courses"
					content = {<CourseList navigation = {this.props.navigation} newCourse = {this.newCourse.bind(this)}/>}
				/>
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
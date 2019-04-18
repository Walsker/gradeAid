// React Native imports
import React, {Component} from 'react';
import {Alert, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {deleteCourse} from 'gradeAid/src/userData/actions';
import {selectCourse} from 'gradeAid/src/navDrawer/actions';

// Custom imports
import CourseCard from './courseCard';

class CourseList extends Component
{
	toCourseScreen(courseID)
	{
		return () => 
		{
			this.props.navigation.navigate("Course");
			this.props.selectCourse(courseID);
		}
	}

	deleteCourse(courseID)
	{
		return () =>
		{
			Alert.alert(
				"Drop Course",
				"Are you sure you would like to drop this course?",
				[
					{text: 'Yes', onPress: () => this.props.deleteCourse(courseID), style: 'cancel'},
					{text: 'No', onPress: () => {}},
				]
			);
		}
	}

	render()
	{
		let courseTiles = [];
		let animationID = 0;
		let rowCounter = 0;
		let tilesPerRow = 3;

		for (course of this.props.courses)
		{
			if (!course) continue;

			courseTiles.push(
				<CourseCard 
					key = {course._id}
					action = {this.toCourseScreen(course._id)}
					animationID = {animationID}
					course = {course}
					editable = {this.props.editable}
					onDelete = {this.deleteCourse(course._id)}
				/>
			);

			rowCounter++;
			if (rowCounter == tilesPerRow)
			{
				rowCounter = 0;
				animationID++;
			}
		}

		return (
			<View style = {{
				flex: 1,
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center'
			}}>
				{courseTiles}
			</View>
		);
	}
}

export default connect(null, {deleteCourse, selectCourse})(CourseList);
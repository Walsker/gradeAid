// React Native imports
import React, {Component} from 'react';
import {View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {selectCourse} from 'gradeAid/src/navDrawer/actions';

// Custom imports
import {CourseCard} from './courseCard';

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

	render()
	{
		let courseTiles = [];
		let animationID = 0;
		let rowCounter = 0;
		let tilesPerRow = 3;

		for (course of this.props.courses)
		{
			courseTiles.push(
				<CourseCard 
					key = {course._id}
					course = {course}
					animationID = {animationID}
					action = {this.toCourseScreen(course._id)}
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

export default connect(null, {selectCourse})(CourseList);
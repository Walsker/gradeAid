// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux imports
import {connect} from 'react-redux';
import {selectCourse} from 'gradeAid/src/navDrawer/redux/actions';

// Custom imports
import {colors, containerStyle} from 'gradeAid/src/common/appStyles';
import {Button, ProgressCircle} from 'gradeAid/src/common';
import {AddCourseCard, CourseCard} from './courseCard';

class CourseList extends Component
{
	toCourseScreen(courseID)
	{
		return () => 
		{
			this.props.selectCourse(courseID);
			this.props.navigation.navigate("Course");
		}
	}

	render()
	{
		var courseTiles = [];
		var animationIDs = 0;
		var rowCounter = 0;
		var tilesPerRow = 3;

		for (id in this.props.courseObjects)
		{
			courseTiles.push(
				<CourseCard 
					key = {id}
					courseObject = {this.props.courseObjects[id]}
					animationID = {animationIDs}
					action = {this.toCourseScreen(id)}
				/>
			);

			rowCounter++;
			if (rowCounter == tilesPerRow)
			{
				rowCounter = 0;
				animationIDs++;
			}
		}

		courseTiles.push(
			<AddCourseCard key = "Add Course Card" action = {this.props.newCourse}/>
		);

		return(
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

const mapStateToProps = (state) =>
{
	var courseObjects = {};
	for (id in state.courseList)
	{
		if (state.selectedSemester == state.courseList[id].semesterID)
			courseObjects = Object.assign(courseObjects, {[id]: state.courseList[id]});
	}

	return {courseObjects};
}
export default connect(mapStateToProps, {selectCourse})(CourseList);

const styles = StyleSheet.create(
{
	list:
	{
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	courseName:
	{
		flex: 1,
		paddingTop: 20
	},
	courseNameText:
	{
		color: colors.darkPrimaryColor,
		fontFamily: 'Lato-Black',
		fontSize: 17,
		textAlign: 'center',
		width: 100
	}
});
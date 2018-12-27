// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux imports
import {connect} from 'react-redux';
import {selectCourse} from 'gradeAid/src/navDrawer/redux/actions';

// Custom imports
import {colors, containerStyle} from 'gradeAid/src/common/appStyles';
import {ProgressCircle} from 'gradeAid/src/common';

class CourseList extends Component
{
	toCourseScreen(courseID)
	{
		this.props.selectCourse(courseID);
		this.props.navigation.navigate("Course");
	}

	createCourseCard(courseID, animationID)
	{
		var courseObject = this.props.courseObjects[courseID];
		return(
			<TouchableNativeFeedback
				key = {courseID}
				background = {TouchableNativeFeedback.Ripple(colors.lightPrimaryColor, false)}
				onPress = {() => this.toCourseScreen(courseID)}
			>
				<View style = {containerStyle.roundedBox}>
					<ProgressCircle
						diameter = {100}
						borderWidth = {10}
						ringColor = {colors.accentColor}
						emptyRingColor = {colors.darkPrimaryColor}
						backgroundColor = {colors.spaceColor}
						percentage = {courseObject.average}
						active = {!(courseObject.average == -1)}
						animationDelay = {500 + (parseInt(animationID) * 750)}
					/>
					<View style = {styles.courseName}>
						<Text
							style = {styles.courseNameText}
							numberOfLines = {2}
						>
							{courseObject.name}
						</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
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
				this.createCourseCard(id, animationIDs)
			);

			rowCounter++;
			if (rowCounter == tilesPerRow)
			{
				rowCounter = 0;
				animationIDs++;
			}
		}

		courseTiles.push(
			<TouchableNativeFeedback
				key = "Add Course Button"
				background = {TouchableNativeFeedback.Ripple(colors.lightPrimaryColor, false)}
				onPress = {this.props.newCourse}
			>
				<View style = {containerStyle.roundedBox}>
					<View style = {{
						alignItems: 'center',
						alignSelf: 'center',
						justifyContent: 'center',
						backgroundColor: colors.darkPrimaryColor,
						borderRadius: 50
					}}>
						<Icon
							name = 'add'
							size = {75}
							color = {colors.accentColor}
						/>
					</View>
					<View style = {styles.courseName}>
						<Text
							style = {styles.courseNameText}
							numberOfLines = {2}
						>
							ADD COURSE
						</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		);

		return(
			<View style = {styles.list}>
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
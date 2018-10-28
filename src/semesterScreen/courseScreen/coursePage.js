// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {ActionBar, Button, IconButton, ProgressCircle, Tile} from 'easyGrades/src/common';
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import AssessmentList from './_components/assessmentList';

class CoursePage extends Component
{
	editCourse()
	{
		alert("Edit Course");
	}

	inputGrade()
	{
		this.props.navigation.navigate("InputGradePage");
	}

	newCourse_SCENE()
	{
		return(
			<View style = {containerStyle.tileList}>
				<Tile
					title = "New Course"
					content =
					{
						<View>
							<View style = {{marginVertical: 5}}/>
							<Text style = {textStyle.regular(16, 'center')}>
								You haven't completed any assessments yet.
							</Text>
							<View style = {{marginVertical: 5}}/>
							<View style = {containerStyle.rowBox}>
								<Button
									label = "Input Grade"
									color = {colors.primaryColor}
									inverted = {false}
									action = {this.inputGrade.bind(this)}
								/>
							</View>
						</View>
					}
				/>
			</View>
		);
	}

	course_SCENE()
	{
		return(
			<ScrollView style = {containerStyle.tileList}>
				<Tile title = "Average"
					content =
					{
						<View>
							<ProgressCircle
								diameter = {275}
								borderWidth = {15}
								ringColor = {colors.accentColor}
								emptyRingColor = {colors.darkPrimaryColor}
								backgroundColor = {colors.spaceColor}
								percentage = {course.average}
								active = {!course.newCourse}
								animationDelay = {0}
							/>
							<View style = {{paddingTop: 10}}>
								<Text style = {[textStyle.italic(14, 'center'), {color: colors.secondaryTextColor}]}>{(Math.round(course.average*10000000000)/10000000000) + "%"}</Text>
							</View>
						</View>

					}
				/>
				{/* <Tile
					title = "Insights"
					content =
					{
						<Text style = {{paddingHorizontal: 10, fontSize: 16, fontFamily: 'Lato-Italic', color: colors.secondaryTextColor, textAlign: 'center'}}>
							Here I'll include information to do with the goals that the user may have set, or other relevant calculated information.
							{"\n"}~{"\n"}The above average isn't actually the calculated average, it's just a placeholder.
						</Text>
					}
				/> */}
				<Tile
					title = "Overview"
					content =
					{
						<AssessmentList
							goToInputGradePage = {() => this.props.navigation.navigate("InputGradePage", {course, semesterName})}
							assessments = {course.assessments}
						/>
					}
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
							type = 'arrow-back'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					title = {this.props.course.name}
					rightButton =
					{
						<IconButton
							type = 'edit'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {this.editCourse}
						/>
					}
				/>
				{this.props.course.newCourse ? this.newCourse_SCENE() : this.course_SCENE()}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		course: state.courseList[state.selectedCourse]
	};
}
export default connect(mapStateToProps)(CoursePage);
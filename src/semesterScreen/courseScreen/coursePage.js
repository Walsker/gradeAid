// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {getCourse} from './selector';

// Custom imports
import {ActionBar, Button, IconButton, ProgressBar, ProgressCircle, Tile} from 'gradeAid/src/common';
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import AssessmentList from './components/assessmentList';

class CoursePage extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {dragging: false}
	}

	viewCourseInfo()
	{
		this.props.navigation.navigate("CourseInfoPage");
	}

	inputGrade()
	{
		this.props.navigation.navigate("InputGradePage");
	}

	newCourse_SCENE()
	{
		return (
			<View style = {containerStyle.tileList}>
				<Tile title = "No Assessments">
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
				</Tile>
			</View>
		);
	}

	course_SCENE()
	{
		var maxGrade = Math.round(((this.props.course.average * this.props.course.completion) + (1 - this.props.course.completion)) * 1000) / 10;
		var minGrade = Math.round(this.props.course.average * this.props.course.completion * 1000) / 10;

		return (
			<ScrollView 
				style = {containerStyle.tileList}
				onScrollBeginDrag = {() => this.setState({dragging: true})}
				onScrollEndDrag = {() => this.setState({dragging: false})}
			>
				<Tile title = "Average">
					<ProgressCircle
						diameter = {275}
						borderWidth = {15}
						ringColor = {colors.accentColor}
						emptyRingColor = {colors.darkPrimaryColor}
						backgroundColor = {colors.spaceColor}
						percentage = {this.props.course.average}
						active = {!this.props.course.emptyCourse}
						animationDelay = {0}
					/>
				</Tile>
				<Tile title = {"Class Completion - " + (Math.round(this.props.course.completion * 1000) / 10) + "%"}>
					<View style = {{alignSelf: 'stretch', paddingHorizontal: 25}}>
						<ProgressBar
							percentage = {this.props.course.completion}
							listOrder = {0}
							animationDelay = {300}
						/>
					</View>
				</Tile>
				<Tile title = "New Assessment?">
					<Button
						label = "Input Grade"
						color = {colors.primaryColor}
						inverted = {false}
						action = {this.inputGrade.bind(this)}
					/>
				</Tile>
				<Tile title = "Insights">
					<Text style = {textStyle.regular(16, 'center', colors.secondaryTextColor)}>Highest achievable final grade</Text>
					<Text style = {[textStyle.regular(24, 'center'), {paddingTop: 10}]}>{maxGrade}%</Text>
					<View style = {{marginVertical: 5}}/>
					<Text style = {textStyle.regular(16, 'center', colors.secondaryTextColor)}>Lowest achievable final grade</Text>
					<Text style = {[textStyle.regular(24, 'center'), {paddingBottom: 10}]}>{minGrade}%</Text>
				</Tile>
				<Tile title = "Overview">
					<AssessmentList
						navigation = {this.props.navigation}
						active = {!this.state.dragging}
					/>
				</Tile>
				<View style = {{height: 10}}/>
			</ScrollView>
		);
	}

	render()
	{
		if (!this.props.course)
			return <View/>;
		
		return (
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
							type = 'info-outline'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {this.viewCourseInfo.bind(this)}
						/>
					}
				/>
				{this.props.course.emptyCourse ? this.newCourse_SCENE() : this.course_SCENE()}
			</View>
		);
	}
}

// const mapStateToProps = (state) => ({course: getCourse(state)});
const mapStateToProps = (state) =>
{
	// Finding the course object in the store
	let courseObject = state.courseList[state.selectedCourse];

	// Getting the assessment objects that belong to this course
	let assessments = [];
	for (x of courseObject.assessments)
		assessments.push(state.assessmentList[x])

	// Completing the course object
	let preAverage = 0;
	let completion = 0;

	for (x of assessments)
	{
		if (assessments[i].hidden) continue;
		let weight = courseObject.breakdown[assessments[i].type];

		completion += weight;
		preAverage += assessments[i].grade * weight;
	}

	// Returning the complete course
	return {
		course:
		{
			...courseObject,
			completion,
			average: preAverage / completion,
			emptyCourse: (courseObject.assessments.length == 0 || completion == 0)
		}
	};
};
export default connect(mapStateToProps)(CoursePage);
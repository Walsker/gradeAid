// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {ActionBar, Button, IconButton, ProgressBar, ProgressCircle, Tile} from 'gradeAid/src/common';
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import AssessmentList from './_components/assessmentList';

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
						active = {this.props.course.average != -1}
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
					{/* <Button
						label = "Explore"
						color = {'green'}
						inverted = {false}
						action = {() => {}}
					/> */}
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
				{this.props.newCourse ? this.newCourse_SCENE() : this.course_SCENE()}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	var newCourse = true;

	for (id in state.assessmentList)
	{
		if (state.assessmentList[id].courseID == state.selectedCourse)
		{
			newCourse = false;
			break;
		}
	}

	return {
		course: state.courseList[state.selectedCourse],
		newCourse
	};
}
export default connect(mapStateToProps)(CoursePage);
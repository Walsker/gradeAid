// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {ActionBar, Button, IconButton, ProgressCircle, Tile} from 'gradeAid/src/common';
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
		return(
			<View style = {containerStyle.tileList}>
				<Tile
					title = "No Assessments"
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
			<ScrollView 
				style = {containerStyle.tileList}
				onScrollBeginDrag = {() => this.setState({dragging: true})}
				onScrollEndDrag = {() => this.setState({dragging: false})}
			>
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
								percentage = {this.props.course.average}
								active = {true}
								animationDelay = {0}
							/>
						</View>
					}
				/>
				<Tile
					title = "New Assessment?"
					content = 
					{
						<Button
							label = "Input Grade"
							color = {colors.primaryColor}
							inverted = {false}
							action = {this.inputGrade.bind(this)}
						/>
					}
				/>
				<Tile
					title = "Overview"
					content = {
					<AssessmentList
						navigation = {this.props.navigation}
						active = {!this.state.dragging}
					/>
				}
				/>
				<View style = {{height: 10}}/>
			</ScrollView>
		);
	}

	render()
	{
		if (!this.props.course)
			return <View/>;
		
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
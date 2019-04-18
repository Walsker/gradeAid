// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

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

	inputGrade()
	{
		this.props.navigation.navigate("InputGradeForm");
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
		// Calculating the highest and lowest grade
		let maxGrade = Math.round(((this.props.course.average * this.props.course.completion) + (1 - this.props.course.completion)) * 1000) / 10;
		let minGrade = Math.round(this.props.course.average * this.props.course.completion * 1000) / 10;

		let averageTile = 
		(
			this.props.course.completion == 0 ? <View/> :
			<Tile title = "Average">
				<ProgressCircle
					diameter = {275}
					borderWidth = {15}
					ringColor = {colors.accentColor}
					emptyRingColor = {colors.darkPrimaryColor}
					backgroundColor = {colors.spaceColor}
					percentage = {this.props.course.average}
					active = {!this.props.emptyCourse}
					animationDelay = {0}
				/>
			</Tile>
		);

		let breakdownComponents = this.props.course.breakdown.map((component, i) =>
		{
			return (
				<View
					key = {i}
					style = {{marginVertical: 2}}
				>
					<Text style = {textStyle.regular(18, 'center')}>
						{component.name} - {(component.weight * 100).toString()}%
					</Text>
				</View>
			);
		});

		let breakdownTile =
		(
			this.props.course.breakdown.length == 0 ? 
			// <Tile title = "Breakdown">
			// 	<Button
			// 		label = "Specify Breakdown"
			// 		color = {colors.primaryColor}
			// 		inverted = {false}
			// 		action = {() => {}}
			// 	/>
			// </Tile>
			<View/>
			:
			<Tile title = "Breakdown">
				{breakdownComponents}
			</Tile>
		);

		return (
			<ScrollView 
				style = {containerStyle.tileList}
				onScrollBeginDrag = {() => this.setState({dragging: true})}
				onScrollEndDrag = {() => this.setState({dragging: false})}
			>
				{averageTile}
				<Tile title = "">
					<View style = {{flex: 1, marginTop: -15}}>
						<Button
							label = "Input Grade"
							color = {colors.primaryColor}
							inverted = {false}
							action = {this.inputGrade.bind(this)}
						/>
					</View>
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
				<Tile title = "Overview">
					<AssessmentList
						assessments = {this.props.course.assessments}
						active = {!this.state.dragging}
					/>
				</Tile>
				{breakdownTile}
				{/* <Tile title = "Insights">
					<Text style = {textStyle.regular(16, 'center', colors.secondaryTextColor)}>Highest achievable final grade</Text>
					<Text style = {[textStyle.regular(24, 'center'), {paddingTop: 10}]}>{maxGrade}%</Text>
					<View style = {{marginVertical: 5}}/>
					<Text style = {textStyle.regular(16, 'center', colors.secondaryTextColor)}>Lowest achievable final grade</Text>
					<Text style = {[textStyle.regular(24, 'center'), {paddingBottom: 10}]}>{minGrade}%</Text>
				</Tile> */}
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
							type = 'edit'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {() => {}}
						/>
					}
				/>
				{this.props.emptyCourse ? this.newCourse_SCENE() : this.course_SCENE()}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	// Finding the course object in the store
	let courseObject = state.courseList[state.selectedCourse];

	// Getting the assessment objects that belong to this course
	let assessments = courseObject.assessments.map(id => state.assessmentList[id]);

	// Returning the complete course
	return {
		course:
		{
			...courseObject,
			assessments
		},
		emptyCourse: courseObject.assessments.length == 0
	};
};
export default connect(mapStateToProps)(CoursePage);
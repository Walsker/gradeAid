// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editCourse} from 'gradeAid/src/userData/actions';

// Custom imports
import {ActionBar, Button, IconButton, ProgressBar, ProgressCircle, Tile} from 'gradeAid/src/common';
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import AssessmentList from './components/assessmentList';

class CoursePage extends Component
{
	constructor(props)
	{
		super(props);

		this.changeCourseName = this.changeCourseName.bind(this);

		this.state =
		{
			dragging: false,
			editable: false,
			newCourseName: props.course.name
		};
	}

	inputGrade()
	{
		this.props.navigation.navigate("InputGradeForm");
	}

	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Unnamed Course":

				Alert.alert(
					"Incomplete",
					"Please be sure to give the course a code.",
					[
						{text: 'OK', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;

			case "Course already exists":

				Alert.alert(
					"Course Code Taken",
					"Please give the course a different code.",
					[
						{text: 'OK', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;
		}
	}

	changeCourseName()
	{
		let courseName = this.state.newCourseName.trim();

		console.log("T:", this.props.usedCourseNames, courseName);
		if (courseName == this.props.course.name)
			this.setState({editable: false});
		else if (courseName == "")
			this.showAlert("Unnamed Course");
		else if (this.props.usedCourseNames.includes(courseName))
			this.showAlert("Course already exists");
		else
		{
			this.props.editCourse(this.props.course._id, {name: courseName});
			this.setState({editable: false, newCourseName: courseName});
		}
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
						{component.name} - {(Math.round(component.weight * 1000) / 10).toString()}%
					</Text>
				</View>
			);
		});

		let breakdownTile =
		(
			this.props.course.breakdown.length == 0 ? 
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
				{breakdownTile}
				<Tile title = "Overview">
					<AssessmentList
						assessments = {this.props.course.assessments}
						active = {!this.state.dragging}
					/>
				</Tile>
				<View style = {{height: 10}}/>
			</ScrollView>
		);
	}

	render()
	{
		let titleComponent = 
		(
			this.state.editable ?
				<View style = 
				{{
					marginLeft: -4,
					marginBottom: -5
				}}>
					<TextInput
						autoCapitalize = 'characters'
						defaultValue = {this.props.course.name}
						fontSize = {24}
						textAlign = 'left'
						textColor = '#FFFFFF'
						maxLength = {25}
						placeholder = "Course Code"
						placeholderTextColor = '#FFFFFF20'
						onChangeText = {(newText) => this.setState({newCourseName: newText})}
						onSubmitEditing = {this.changeCourseName}
						returnKeyType = 'done'
						style = {textStyle.thick(24, 'left', '#FFFFFF')}
						underlineColorAndroid = '#FFFFFF'
					/>
				</View>
			: <Text style = {textStyle.thick(24, 'left', '#FFFFFF')}>{this.props.course.name}</Text>
		);
			
		if (!this.props.course)
			return <View/>;
		
		return (
			<View style = {containerStyle.default}>
				<ActionBar
					color = {colors.primaryColor}
					leftButton =
					{
						<IconButton
							type = 'arrow-back'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					rightButton =
					{
						<IconButton
							type = {this.state.editable ? 'done' : 'edit'}
							size = {30}
							color = {colors.titleAndIconColor}
							action = {() => 
							{
								if (this.state.editable)
								{
									this.changeCourseName();
									this.setState({editable: false});
								}
								else
									this.setState({editable: true});
							}}
						/>
					}
				>
					{titleComponent}
				</ActionBar>
				{this.props.emptyCourse ? this.newCourse_SCENE() : this.course_SCENE()}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	let {semesterList, selectedSemester, courseList, selectedCourse, assessmentList} = state;
	
	// Finding the course object in the store
	let courseObject = courseList[selectedCourse];

	// Getting the assessment objects that belong to this course
	let assessments = courseObject.assessments.map(id => assessmentList[id]);

	// Findind out which course names have been used
	console.log("HI:", semesterList[selectedSemester])
	let usedCourseNames = semesterList[selectedSemester].courses.map(id => courseList[id].name);

	// Returning the complete course
	return {
		course:
		{
			...courseObject,
			assessments
		},
		emptyCourse: courseObject.assessments.length == 0,
		usedCourseNames
	};
};
export default connect(mapStateToProps, {editCourse})(CoursePage);
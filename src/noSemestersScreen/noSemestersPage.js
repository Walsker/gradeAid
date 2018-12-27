// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton} from 'gradeAid/src/common';

class NoSemestersPage extends Component
{
	constructor(props)
	{
		super(props);

		var focusListener;
		var moveOnIfSemestersExist = () =>
		{
			var showNoSemestersPage = this.props.navigation.getParam('showNoSemesters', true);
			if (this.props.goStraightToSemester && !showNoSemestersPage)
			{
				focusListener.remove();
				this.props.navigation.navigate(this.props.latestSmester);
			}
		};

		focusListener = this.props.navigation.addListener('willFocus', moveOnIfSemestersExist)
	}

	render()
	{
		return (
			<View style = {containerStyle.default}>
				<ActionBar
					inverted = {true}
					leftButton =
					{
						<IconButton
							type = 'menu'
							size = {30}
							color = {colors.primaryColor}
							action = {this.props.navigation.openDrawer}
						/>
					}
				/>
				<View style = {containerStyle.page}>
					<View style = {{flex: 1, justifyContent: 'center', padding: 50, paddingTop: -56}}>
						<Text style = {textStyle.regular(16, 'center')}>
							Get started by pressing that button right there.
						</Text>
						<View style = {{marginVertical: 20}}/>
						<Button
							label = "Start Semester"
							color = {colors.primaryColor}
							inverted = {false}
							action = {() => this.props.navigation.navigate("NewSemesterPage")}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	var semesterName = "";
	var semestersExist = false;

	for (i in state.semesters)
	{
		semestersExist = true;
		semesterName = state.semesters[i].name;
	}

	return {
		goStraightToSemester: semestersExist,
		latestSmester: semesterName
	};
}
export default connect(mapStateToProps)(NoSemestersPage);
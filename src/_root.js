// React Native imports
import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';

// Custom imports
import {containerStyle} from 'easyGrades/src/common/appStyles';
import AndroidBar from 'easyGrades/src/common/androidBar';
import {CoursePage} from 'easyGrades/src/coursePage';
import {AddCoursePage} from 'easyGrades/src/addCoursePage';

export default class App extends Component
{
	render()
	{
		return(
			<View style = {containerStyle.default}>
				<AndroidBar/>
				<StatusBar
					translucent
					animated
					backgroundColor = "rgba(0, 0, 0, 0.2)"
				/>
				<AddCoursePage/>
			</View>
		);
	}
}
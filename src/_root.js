// React Native imports
import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';

// Custom imports
import RootNavigator from './_rootNavigator';
import {containerStyle} from 'easyGrades/src/common/appStyles';
import AndroidBar from 'easyGrades/src/common/androidBar';
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';
import AddCoursePage from 'easyGrades/src/addCoursePage/addCoursePage';

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
				<SemesterPage/>
			</View>
		);
	}
}

// This is to get rid of the warning caused while mounting screens with React-navigation.
// There's a possibility that this warning is a false-positive.
// Check if this is fixed in the next React Native update.
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
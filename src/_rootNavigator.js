// React Native components
import React from 'react';

// React Navigation imports
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

// Custom imports
import NavDrawer from 'gradeAid/src/navDrawer/navDrawer';
import * as Forms from 'gradeAid/src/forms';
import AboutPage from 'gradeAid/src/aboutScreen/aboutPage';
import SettingsPage from 'gradeAid/src/settingsScreen/settingsPage';
import {AssessmentPage, CoursePage, SemesterPage} from 'gradeAid/src/semesterScreen';

// Creating the routes for all the forms
let formRoutes = {};

for (x in Forms)
	formRoutes[x] = {screen: Forms[x]}

// Creating the semester page
let semesterStack = createStackNavigator(
{
	Semester: {screen: SemesterPage},
	Course: {screen: CoursePage},
	Assessment: {screen: AssessmentPage}
},
{
	headerMode: 'none',
	initialRouteName: "Semester"
});

// Creating the drawer navigator
let drawerNav = createDrawerNavigator(
{
	"About": {screen: AboutPage},
	"Settings": {screen: SettingsPage},
	"Semesters": semesterStack
}, 
{
	initialRouteName: "Semesters",
	contentComponent: ({navigation}) => <NavDrawer navigation = {navigation}/>
});

// Creating the root navigator
export default createStackNavigator(
{
	"Drawer": drawerNav,
	...formRoutes
},
{
	headerMode: 'none',
	initialRouteName: "Drawer"
});
// React Native components
import React, {Component} from 'react';

// React Navigation imports
import
{
	createDrawerNavigator,
	createStackNavigator
} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import NavDrawer from 'easyGrades/src/navDrawer/navDrawer';
import * as Modals from 'easyGrades/src/modals';
import NoSemestersPage from 'easyGrades/src/noSemestersScreen/noSemestersPage';
import AboutPage from 'easyGrades/src/aboutScreen/aboutPage';
import SettingsPage from 'easyGrades/src/settingsScreen/settingsPage';
import {CoursePage, SemesterPage} from 'easyGrades/src/semesterScreen';

class RootNavigator extends Component
{
	constructor(props)
	{
		super(props);

		// Creating the routes for all the modals
		var modalRoutes = {};
		for (modal in Modals)
		{
			modalRoutes[modal] = {screen: Modals[modal]}
		}

		// Creating the semester screen
		var semesterScreen = createStackNavigator(
		{
			Semester: {screen: SemesterPage},
			Course: {screen: CoursePage}
		},
		{
			headerMode: 'none',
			initialRouteName: "Semester"
		});

		// Creating a drawer navigator
		var landingPage = Object.keys(this.props.semesterList).length == 0 ?
			"No Semesters" : "Semester Screen";

		var drawerNavConfig =
		{
			initialRouteName: landingPage,
			contentComponent: ({navigation}) =>
			{
				return <NavDrawer navigation = {navigation}/>;
			}
		};

		var drawerRoutes =
		{
			"About": {screen: AboutPage},
			"Settings": {screen: SettingsPage},
			"No Semesters": {screen: NoSemestersPage},
			"Semester Screen": semesterScreen
		};
		var DrawerNavigator = createDrawerNavigator(drawerRoutes, drawerNavConfig);

		// Creating the main navigator (drawer navigator + modals)
		var mainRoutes = Object.assign(modalRoutes, {"Drawer": DrawerNavigator});
		var MainNavigator = createStackNavigator(mainRoutes,
		{
			headerMode: 'none',
			initialRouteName: "Drawer"
		});

		this.state =
		{
			mainNavigator: <MainNavigator/>
		};
	}

	render()
	{
		return this.state.mainNavigator;
	}
}

const mapStateToProps = (state) =>
{
	console.log("App State: ", state);

	return {
		navReducer: state.navReducer,
		semesterList: state.semesterList,
		courseList: state.courseList,
		assessmentList: state.assessmentList,
	};
}
export default connect(mapStateToProps)(RootNavigator);
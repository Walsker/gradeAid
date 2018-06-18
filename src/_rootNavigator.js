// React Native components
import React, {Component} from 'react';

// React Navigation imports
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

// Custom imports
import NavDrawer from 'easyGrades/src/common/navDrawer';
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';

export default class RootNavigator extends Component
{
    // TODO: Turn into a redux action
    createSemesterPage(semester)
    {
        var routes = {};
        routes[semester.name] = {screen: SemesterPage}

        for (i in semester.courses)
        {
            routes[semester.courses[i].name] = {screen: CoursePage}
        }

        return(
            createStackNavigator(routes, {headerMode: 'none'})
        );
    }

    // TODO: Turn into a redux action
    generateRouteConfigs(semesterList)
    {
        var routes = {};
        
        for (i in semesterList)
        {
            routes[semesterList[i].name] = {screen: this.createSemesterPage(semesterList[i])}
        }
        
        return routes;
    }

    render()
    {
        var navConfig = {
            //intialRouteName: {The current semester},
            contentComponent: ({navigation}) =>
            {
                return <NavDrawer navProp = {navigation} semesters = {this.props.semesters}/>;
            }
        };

        var DrawerNavigator = createDrawerNavigator(this.generateRouteConfigs(this.props.semesters), navConfig);

        return(
            <DrawerNavigator/>
        );
    }
}
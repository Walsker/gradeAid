// React Native components
import React, {Component} from 'react';

// React Navigation imports
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {loadSemesterList} from './appRedux/actions';

// Custom imports
import {NavDrawer} from 'easyGrades/src/common';

class RootNavigator extends Component
{
    constructor(props)
    {
        super(props);
        // this.props.loadSemesterList();        
    }

    renderDrawerNavigator()
    {
        // Finding the last semester added to the app
        var latestSemester;
        for (i in this.props.mainRoutes)
        {
            latestSemester = i;
        }

        var navConfig = {
            initialRouteName: latestSemester,
            drawerLockMode: 'locked-closed',
            contentComponent: ({navigation}) =>
            {
                return <NavDrawer navProp = {navigation}/>;
            }
        };

        return createDrawerNavigator(this.props.mainRoutes, navConfig);
    }
    
    render()
    {   
        var mainRoutes = Object.assign({}, {"Drawer": this.renderDrawerNavigator()}, this.props.modalRoutes);
        var MainNavigator = createStackNavigator(mainRoutes,
        {
            headerMode: 'none',
            initialRouteName: "Drawer"
        });
        
        return(
            <MainNavigator/>
        );
    }
}

// Imports for the following functions
import {CoursePage, EditSemesterPage, InputGradePage, SemesterPage} from 'easyGrades/src/semesterScreen';
import * as Modals from 'easyGrades/src/modals';
import NoSemestersPage from 'easyGrades/src/noSemestersScreen/noSemestersPage';
import AboutPage from 'easyGrades/src/aboutScreen/aboutPage';

const createSemesterPage = (semester) =>
{
    var routes = {};
    routes[semester.name] = {screen: SemesterPage}; // The actual page
    // routes["Edit Semester"] = {screen: EditSemesterPage}
    
    // Creating pages for the individual courses
    for (i in semester.courses)
    {
        routes[semester.courses[i].name] = createStackNavigator({
            "Course Screen": {screen: CoursePage},
            "Input Grade": {screen: InputGradePage}
        }, 
        {
            headerMode: 'none',
            initialRouteName: "Course Screen"
        });
    }

    // Returning a Stack Navigator
    return(createStackNavigator(routes, {headerMode: 'none'}));
}

const generateMainRoutes = (semesterList) =>
{
    var mainRoutes = 
    {
        "About": {screen: AboutPage},
        "Settings": {screen: AboutPage},
        "No Semesters": {screen: NoSemestersPage}
    };

    // Adding all the semesters to route configuration
    for (i in semesterList)
    {
        mainRoutes[semesterList[i].name] = {screen: createSemesterPage(semesterList[i])};
    }

    return mainRoutes;
}

const generateModalRoutes = () =>
{
    var modalRoutes = {};

    // Adding all the modals to route configuration
    for (var modal in Modals)
    {
        modalRoutes[modal] = {screen: Modals[modal]}
    }

    return modalRoutes;
}

const mapStateToProps = (state) =>
{
    console.log("App State: ", state)

    return {
        mainRoutes: generateMainRoutes(state.semesters),
        modalRoutes: generateModalRoutes(),
        semesters: state.semesters
    };
};
export default connect(mapStateToProps, {loadSemesterList})(RootNavigator);
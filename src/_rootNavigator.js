// React Native components
import React, {Component} from 'react';

// React Navigation imports
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {generateRouteConfigs} from './_rootActions';

// Custom imports
import NavDrawer from 'easyGrades/src/common/navDrawer';

class RootNavigator extends Component
{
    // // TODO: Turn into a redux action
    // createSemesterPage(semester)
    // {
    //     var routes = {};
    //     routes[semester.name] = {screen: SemesterPage}

    //     for (i in semester.courses)
    //     {
    //         routes[semester.courses[i].name] = {screen: CoursePage}
    //     }

    //     return(
    //         createStackNavigator(routes, {headerMode: 'none'})
    //     );
    // }

    // // TODO: Turn into a redux action
    // generateRouteConfigs(semesterList)
    // {
    //     var routes = {};
        
    //     for (i in semesterList)
    //     {
    //         routes[semesterList[i].name] = {screen: this.createSemesterPage(semesterList[i])}
    //     }
        
    //     return routes;
    // }

    constructor(props)
    {
        super(props);
        this.props.generateRouteConfigs(this.props.semesters);
    }

    render()
    {
        var navConfig = {
            //intialRouteName: {The current semester},
            contentComponent: ({navigation}) =>
            {
                return <NavDrawer navProp = {navigation}/>;
            }
        };
        
        var DrawerNavigator = createDrawerNavigator(this.props.routeConfigs, navConfig);

        return(
            <DrawerNavigator/>
        );
    }
}

const mapStateToProps = (state) =>
{
    console.log("App State: ", state)
    return {
        routeConfigs: state.routeConfigs,
        semesters: state.semesters
    };
}

export default connect(mapStateToProps, {generateRouteConfigs})(RootNavigator);
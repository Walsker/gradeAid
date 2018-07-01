// React Native components
import React, {Component} from 'react';

// React Navigation imports
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {generateRouteConfigs} from './appRedux/actions';

// Custom imports
import NavDrawer from 'easyGrades/src/common/navDrawer';

class RootNavigator extends Component
{
    constructor(props)
    {
        super(props);
        this.props.generateRouteConfigs(this.props.semesters);
    }

    render()
    {
        // Finding the last semester added to the app
        var latestSemester = "";
        for (i in this.props.routeConfigs)
        {
            latestSemester = i;
        }

        var navConfig = {
            initialRouteName: latestSemester,
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
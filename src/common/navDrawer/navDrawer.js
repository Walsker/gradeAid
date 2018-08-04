// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// React Navigation imports
import {NavigationActions} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {newSemester} from 'easyGrades/src/appRedux/actions';

// Custom imports
import {containerStyle, textStyle} from '../appStyles';
import Divider from './divider';
import DrawerItem from './drawerItem';

class NavDrawer extends Component
{
    createSemesterLink(semester)
    {
        return(
            <DrawerItem
                key = {semester.name}
                title = {semester.name}
                action = {() => this.props.navProp.navigate(semester.name, {semester})}
            />
        );
    }

    render()
    {
        var semesterLinks = this.props.semesters.map(semester => this.createSemesterLink(semester));
        if (semesterLinks.length != 0)
        {
            semesterLinks.push(<Divider key = "Divider"/>);
        }
        
        var newSemester = () =>
        {
            this.props.newSemester();
        }

        var linkToAddSemester = NavigationActions.navigate(
        {
            routeName: 'New Semester',          
            action: NavigationActions.navigate({routeName: 'Add Semester', params: {showNoSemesters: this.props.semesters.length == 0}}),
        });

        return(
            <View style = {containerStyle.default}>
                <View style = {containerStyle.drawerHeader}>
                    <Text style = {[textStyle.bold(56), {color: 'white'}]}>Easy Grades</Text>
                </View>
                <View style = {containerStyle.default}>
                    <View style = {{marginVertical: 5}}/>
                    {semesterLinks}
                    <DrawerItem 
                        title = "New Semester"
                        action = {() => this.props.navProp.dispatch(linkToAddSemester)}
                    />
                    <Divider/>
                    <DrawerItem title = "Settings" action = {() => this.props.navProp.navigate("Settings")}/>
                    <DrawerItem title = "About" action = {() => this.props.navProp.navigate("About")}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, regularProps) =>
{
    return {
        ...regularProps,
        semesters: state.semesters
    };
}
                    
export default connect(mapStateToProps, {newSemester})(NavDrawer);
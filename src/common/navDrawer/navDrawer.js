// React Native imports
import React, {Component} from 'react';
import {Button, Text, TouchableHighlight, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {newSemester} from 'easyGrades/src/appRedux/actions';

// Custom imports
import {containerStyle} from '../appStyles';
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
        var newSemester = () =>
        {
            this.props.newSemester();
        }

        return(
            <View style = {containerStyle.default}>
                <View style = {containerStyle.drawerHeader}>
                    <Text style = {{fontFamily: 'Lato-Black', fontSize: 56, color: 'white'}}>Easy Grades</Text>
                </View>
                <View style = {containerStyle.default}>
                    {semesterLinks}
                    <Divider/>
                    <DrawerItem title = "New Semester" action = {() => newSemester()}/>
                    <Divider/>
                    <DrawerItem title = "Settings" action = {() => {}}/>
                    <DrawerItem title = "Send Feedback" action = {() => {}}/>
                    <DrawerItem title = "About" action = {() => {}}/>
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
// React Native imports
import React, {Component} from 'react';
import {Button, Text, TouchableHighlight, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

class NavDrawer extends Component
{
    createSemesterLink(semester)
    {
        return(
            <View key = {semester.name} style = {{paddingVertical: 10}}>
                <Button
                    title = {semester.name}
                    onPress = {() => this.props.navProp.navigate(semester.name, {semester})}
                />
            </View>
        );
    }

    render()
    {
        var semesterLinks = this.props.semesters.map(semester => this.createSemesterLink(semester));

        return(
            <View style = {{flex: 1}}>
                {semesterLinks}
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

export default connect(mapStateToProps)(NavDrawer);
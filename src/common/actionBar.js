// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from './appStyles';

export default class ActionBar extends Component
{
    render()
    {
        return(
            <View style = {containerStyle.actionBar}>
                {this.props.leftButton}
                <View style = {{width: 32}}/>
                <View style = {{flex: 1}}>
                    <Text style = {textStyle.actionBarTitle}>{this.props.title}</Text>
                </View>
                {this.props.rightButton}
            </View>
        );
    }
}


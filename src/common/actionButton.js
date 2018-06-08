// React Native imports
import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom imports
import {colors} from './appStyles';

export default class ActionButton extends Component
{
    render()
    {
        return(
            <TouchableOpacity onPress = {() => {this.props.action}}>
                <Icon
                    name = {this.props.type}
                    size = {this.props.size}
                    color = {colors.titleAndIconColor}
                />
            </TouchableOpacity>
        );
    }
}
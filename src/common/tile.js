// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from './appStyles';

export default class Tile extends Component
{
    render()
    {
        var title = this.props.title.toUpperCase();
        return(
            <View style = {containerStyle.tile}>
                <View style = {containerStyle.tileTitle}>
                    <Text style = {textStyle.tileTitle}>{title}</Text>
                </View>
                <View style = {containerStyle.tileContent}>
                    {this.props.content}
                </View>
            </View>
        );
    }
}
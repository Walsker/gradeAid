// React Native imports
import React, {Component} from 'react';
import {Platform, Text, TextInput, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

export default class TextField extends Component
{
    render()
    {
        var borderStyle = Platform.OS === 'ios' ? containerStyle.courseCard : {};
        return (
            <View>
                <View style = {borderStyle}>
                    <TextInput
                        {...this.props}
                        style = {textStyle.regular(this.props.fontSize, this.props.textAlign)}
                    />
                </View>
                <Text style = {textStyle.regular(this.props.fontSize / 1.7, this.props.textAlign)}>
                    {this.props.label}
                </Text>
            </View>
        );
    }
}
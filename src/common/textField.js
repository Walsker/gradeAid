// React Native imports
import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

export default class TextField extends Component
{
    render()
    {
        return (
            <View>
                <View style = {containerStyle.courseCard}>
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
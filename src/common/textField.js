// React Native imports
import React, {Component} from 'react';
import {Dimensions, Platform, Text, TextInput, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

export default class TextField extends Component
{
    render()
    {
        var screenWidth = Dimensions.get('window').width;

        var borderStyle;
        if (Platform.OS === 'ios')
            borderStyle = containerStyle.roundedBox;
        else
        {
            if (this.props.keyboardType == 'numeric')
            {
                switch (this.props.textAlign)
                {
                    case 'left':
                        borderStyle = {width: Dimensions.get('window').width / 3, alignSelf: 'flex-start'};
                        break;
                    case 'right':
                        borderStyle = {width: Dimensions.get('window').width / 3, alignSelf: 'flex-end'};
                        break;
                    default:
                        borderStyle = {width: Dimensions.get('window').width / 3, alignSelf: 'center'};
                }
            }
        }

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
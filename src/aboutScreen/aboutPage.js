// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'easyGrades/src/common/appStyles';

export default class AboutPage extends Component
{
    render()
    {
        return(
            <View style = {containerStyle.page}>
                <Text style = {textStyle.regular(28, 'center')}>This is Wal's creation.</Text>
            </View>
        );
    }
}
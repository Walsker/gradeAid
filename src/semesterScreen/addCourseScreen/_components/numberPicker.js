// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors} from 'easyGrades/src/common/appStyles';
import {IconButton} from 'easyGrades/src/common';

export default class NumberPicker extends Component
{
    render()
    {
        return(
            <View style = {styles.default}>
                <IconButton
                    type = 'remove-circle'
                    size = {25}
                    color = {colors.primaryColor}
                    action = {() => this.props.onDecrease()}
                />
                <View style = {styles.number}>
                    <Text style = {styles.numberText}>{this.props.value}</Text>
                </View>
                <IconButton
                    type = 'add-circle'
                    size = {25}
                    color = {colors.primaryColor}
                    action = {() => this.props.onIncrease()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    default:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    number:
    {
        paddingHorizontal: 10
    },
    numberText:
    {
        fontSize: 25,
        fontFamily: 'Lato-Regular',
        color: colors.primaryTextColor
    }
});
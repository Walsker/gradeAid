// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors, textStyle} from './appStyles';

export default class actionBar extends Component
{
    render()
    {
        return(
            <View style = {styles.bar}>
                <View>
                    {this.props.leftButton}
                </View>
                <View style = {styles.title}>
                    <Text style = {textStyle.actionBarTitle}>{this.props.title}</Text>
                </View>
                <View>
                    {this.props.rightButton}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    bar:
    {
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: colors.primaryColor,
        elevation: 3
    },
    title:
    {
        flex: 1,
        margin: 16
    }
});


// React Native imports
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ActionButton extends Component
{
    render()
    {
        return(
            <TouchableOpacity 
                onPress = {() => this.props.action()}
            >
                <View style = {styles.button}>
                    <Icon
                        name = {this.props.type}
                        size = {this.props.size}
                        color = {this.props.color}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create(
{
    button:
    {
        margin: 16,
        width: 24,
        height: 24
    }
});
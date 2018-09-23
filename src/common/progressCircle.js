//--------------------------------------------------------------------------------------------------
//
// Created by Wal Wal
// April 28, 2018
// Required Props: diameter, borderWidth, ringColor, emptyRingColor, backgroundColor, percentage
//
//--------------------------------------------------------------------------------------------------

// React Native imports
import React, {Component} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors} from './appStyles';

export default class ProgressCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {percentage: new Animated.Value(0)}
    }

    componentDidMount() {
        Animated.timing(
            this.state.percentage,
            {
                toValue: this.props.percentage,
                easing: Easing.bezier(0, 0.2, 0.6, 1),
                duration: 1000,
                delay: this.props.animationDelay
            }
        ).start();
    }

    renderSemiCircle(color, diameter, radius) {
        return(
            <View style = {{flexDirection: 'row'}}> 
                <View style = {[
                    styles.semiCircle,
                    {
                        width: radius,
                        height: diameter,
                        borderRadius: diameter,
                        backgroundColor: color,
                    }
                ]}/>
            
                <View style = {[
                    styles.semiCircle,
                    {
                        width: radius,
                        height: diameter,
                        borderRadius: diameter,
                        backgroundColor: 'transparent',
                        transform: [{rotate: '180deg'}]
                    }
                ]}/>
            </View>
        );
    }

    renderRightHalf(diameter, radius) {
        return(
            <Animated.View style = {{
                transform: [{
                    rotate: this.state.percentage.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: ['0deg', '180deg', '180deg']
                    })
                }],
                position: 'absolute'
            }}>
                {this.renderSemiCircle(this.props.ringColor, diameter, radius)}
            </Animated.View>
        );
    }

    renderLeftHalf(diameter, radius) {
        return(
            <Animated.View style = {{
                transform: [{
                    rotate: this.state.percentage.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: ['0deg', '180deg', '360deg']
                    })
                }],
                position: 'absolute'
            }}>
                {this.renderSemiCircle(this.props.ringColor, diameter, radius)}
            </Animated.View>
        );
    }

    renderEmptyLeftHalf(diameter, radius) {
        return(
            <Animated.View style = {{
                opacity: this.state.percentage.interpolate({
                    inputRange: [0, 50, 50, 100],
                    outputRange: [1, 1, 0, 0]
                })
            }}>
                {this.renderSemiCircle(this.props.emptyRingColor, diameter, radius)}
            </Animated.View>
        );
    }

    render() {
        const innerDiameter = this.props.diameter - this.props.borderWidth;
        const diameter = this.props.diameter;
        const radius = this.props.diameter / 2;

        var display = this.props.active ? 
            <Text style = {{
                fontSize: this.props.diameter / 2,
                color: colors.primaryTextColor,
                fontFamily: 'Lato-Regular'
            }}>
                {this.props.percentage.toFixed(0)}
                <Text style = {{fontSize: this.props.diameter / 5}}>%</Text>
            </Text>
            :
            <Text style = {{
                fontSize: this.props.diameter / 2,
                color: colors.primaryTextColor,
                fontFamily: 'Lato-Regular'
            }}>
                ~
            </Text>
        ;

        return(
            <View style = {[
                styles.circle,
                {
                    width: diameter,
                    height: diameter,
                    borderRadius: radius,
                    backgroundColor: this.props.emptyRingColor
                }
            ]}>
                {this.renderRightHalf(diameter, radius)}
                {this.renderLeftHalf(diameter, radius)}
                {this.renderEmptyLeftHalf(diameter, radius)}
                <View style = {[
                    styles.circle,
                    {
                        position: 'absolute',
                        width: innerDiameter,
                        height: innerDiameter,
                        borderRadius: innerDiameter / 2,
                        backgroundColor: this.props.backgroundColor,
                    }
                ]}>
                    {display}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    semiCircle: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
}); 
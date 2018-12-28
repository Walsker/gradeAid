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

// React Navigation imports
import {withNavigationFocus} from 'react-navigation';

// Custom imports
import {colors} from './appStyles';

class ProgressCircle extends Component {
	constructor(props) {
		super(props);
		this.state = {percentage: new Animated.Value(0)}
	}

	refresh()
	{
		Animated.timing(this.state.percentage,
		{
			toValue: Math.min(Math.max(0, this.props.percentage), 1),
			easing: Easing.bezier(0, 0.2, 0.6, 1),
			duration: 1000,
			delay: this.props.animationDelay
		}).start();
	}

	renderSemiCircle(color, diameter, radius) {
		return (
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
		return (
			<Animated.View style = {{
				transform: [{
					rotate: this.state.percentage.interpolate({
						inputRange: [0, .5, 1],
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
		return (
			<Animated.View style = {{
				transform: [{
					rotate: this.state.percentage.interpolate({
						inputRange: [0, .5, 1],
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
		return (
			<Animated.View style = {{
				opacity: this.state.percentage.interpolate({
					inputRange: [0, .5, .5, 1],
					outputRange: [1, 1, 0, 0]
				})
			}}>
				{this.renderSemiCircle(this.props.emptyRingColor, diameter, radius)}
			</Animated.View>
		);
	}

	render()
	{
		if (this.props.isFocused)
			this.refresh();
			
		const innerDiameter = this.props.diameter - this.props.borderWidth;
		const diameter = this.props.diameter;
		const radius = this.props.diameter / 2;

		var display = this.props.active ?
			<Text style = {{
				fontSize: this.props.diameter / 2.5,
				color: colors.primaryTextColor,
				fontFamily: 'Lato-Regular'
			}}>
				{(this.props.percentage * 100).toFixed(0)}
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

		return (
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
export default withNavigationFocus(ProgressCircle);

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
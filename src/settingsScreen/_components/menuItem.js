// React Native imports
import React, {Component} from 'react';
import {Animated, Switch, Text, TouchableWithoutFeedback, View} from 'react-native';

// Custom imports
import {colors, textStyle} from 'gradeAid/src/common/appStyles';
import {Divider} from 'gradeAid/src/common';

export default class MenuItem extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			pressValue: new Animated.Value(0),
			INACTIVE_VALUE: 0,
			ACTIVE_VALUE: 1,
			duration: 75
		};
	}

	onPressIn()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.ACTIVE_VALUE,
			duration: this.state.duration
		}).start();
	}

	onRelease()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.INACTIVE_VALUE,
			duration: this.state.duration,
			delay: 150
		}).start();
		this.props.action();
	}

	itemContent()
	{
		if (this.props.switchable)
		{
			return (
				<View style = {{
						paddingHorizontal: 35,
						paddingVertical: 15,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						backgroundColor: colors.spaceColor
					}}
				>
					<Text style = {textStyle.regular(18, 'left', this.props.color)}>
						{this.props.title}
					</Text>
					<Switch
						style = {{marginVertical: -55}}
						tintColor = {colors.lightPrimaryColor}
						onTintColor = {colors.accentColor}
						thumbTintColor = {colors.primaryColor}
						onValueChange = {this.props.action}
						value = {this.props.switchValue}
					/>
				</View>
			);
		}
		else
		{
			return (
				<TouchableWithoutFeedback onPressIn = {this.onPressIn.bind(this)} onPressOut = {this.onRelease.bind(this)}>
					<Animated.View style = {{
							paddingHorizontal: 35,
							paddingVertical: 15,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: this.state.pressValue.interpolate({
								inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
								outputRange: [colors.spaceColor, colors.lightPrimaryColor]
							})
						}}
					>
						<Text style = {textStyle.regular(18, 'left', this.props.color)}>
							{this.props.title}
						</Text>
					</Animated.View>
				</TouchableWithoutFeedback>
			);
		}
	}

	render()
	{
		return (
			<View>
				{this.itemContent()}
				<Divider color = {colors.dividerColor} seperation = {0} padding = {0}/>
			</View>
		);
	}
}
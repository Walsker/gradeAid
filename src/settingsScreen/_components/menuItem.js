// React Native imports
import React, {Component} from 'react';
import {Animated, Text, TouchableWithoutFeedback, View} from 'react-native';

// Custom imports
import {colors, textStyle} from 'gradeAid/src/common/appStyles';

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
		this.props.action()
	}

	render()
	{
		return(
			<View>
				<TouchableWithoutFeedback onPressIn = {this.onPressIn.bind(this)} onPressOut = {this.onRelease.bind(this)}>
					<Animated.View
						style = {{
							paddingBottom: 1,
							backgroundColor: this.state.pressValue.interpolate({
								inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
								outputRange: [colors.spaceColor, colors.lightPrimaryColor]
							})
						}}
					>
						<Text style = {[textStyle.regular(18, 'left', this.props.color), {paddingLeft: 35, paddingVertical: 10}]}>
							{this.props.title}
						</Text>
					</Animated.View>
				</TouchableWithoutFeedback>
				<View style = {{
					backgroundColor: colors.dividerColor,
					marginVertical: 5,
					height: 1.2
				}}/>
			</View>
		);
	}
}
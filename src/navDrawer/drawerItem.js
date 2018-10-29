// React Native imports
import React, {Component} from 'react';
import {Animated, Text, TouchableWithoutFeedback} from 'react-native';

// Custom imports
import {colors} from 'gradeAid/src/common/appStyles';

export default class DrawerItem extends Component
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
		var bkgColor = this.props.active ? colors.accentColor : colors.spaceColor;

		return(
			<TouchableWithoutFeedback onPressIn = {this.onPressIn.bind(this)} onPressOut = {this.onRelease.bind(this)}>
				<Animated.View
					style = {{
						paddingBottom: 1,
						backgroundColor: this.state.pressValue.interpolate({
							inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
							outputRange: [bkgColor, colors.lightPrimaryColor]
						})
					}}
				>
					<Text
						style = {{
							paddingLeft: 35,
							paddingVertical: 15,
							fontFamily: 'Lato-Regular',
							fontSize: 18
						}}
					>
					{this.props.title}</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}
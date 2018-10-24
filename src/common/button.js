// React import
import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle, colors} from './appStyles';

export default class Button extends Component
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
		return (
			<View style = {containerStyle.rowBox}>
				<TouchableWithoutFeedback
					style = {{alignItems: 'center', alignSelf: 'stretch', flex: 1, paddingVertical: 5}}
					onPressIn = {this.onPressIn.bind(this)}
					onPressOut = {this.onRelease.bind(this)}
				>
					<Animated.View style = {{backgroundColor: this.props.inverted ?
							this.state.pressValue.interpolate({
								inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
								outputRange: [colors.spaceColor, this.props.color]
							})
							:
							this.state.pressValue.interpolate({
								inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
								outputRange: [this.props.color, colors.spaceColor]
							}),
						paddingVertical: 5,
						paddingHorizontal: 35,
						elevation: 3,
						borderRadius: 30,
						borderWidth: 2,
						borderColor: this.props.color
					}}>
						<Animated.Text
							style = {[
								textStyle.bold(20),
								{
									color: this.props.inverted ?
										this.state.pressValue.interpolate({
											inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
											outputRange: [this.props.color, colors.spaceColor]
										})
										:
										this.state.pressValue.interpolate({
											inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
											outputRange: [colors.spaceColor, this.props.color]
										})
								}
							]}
						>
							{this.props.label}
						</Animated.Text>
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}
// React Native imports
import React, {Component} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

// Custom imports
import {colors} from './appStyles';

export default class ProgressBar extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			percentage: new Animated.Value(0),
			width: 0
		};
	}

	componentDidMount()
	{
		var animationDuration = 2500; // milliseconds
		var initialDelay = this.props.animationDelay;

		Animated.timing(this.state.percentage,
		{
			toValue: this.props.percentage,
			easing: Easing.bezier(0, 0.75, 0.25, 1),
			duration: animationDuration,
			delay: initialDelay + (animationDuration / 10 * this.props.listOrder)
		}).start();
	}

	render()
	{
		return(
			<View
				style = {styles.default}
				onLayout = {event =>
				{
					var width = event.nativeEvent.layout.width - 2
					this.setState({width});
				}}
			>
				<Animated.View
					style = {[styles.progress, {
							width: this.state.percentage.interpolate({
								inputRange: [0, this.props.percentage],
								outputRange: [0, this.state.width * (this.props.percentage / 100)]
							})
						}
					]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create(
{
	default:
	{
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
		borderRadius: 10,
		padding: 1,
		overflow: 'hidden'
	},
	progress:
	{
		alignSelf: 'stretch',
		backgroundColor: colors.accentColor,
		height: 10,
		borderRadius: 5
	}
});
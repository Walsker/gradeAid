// React Native imports
import React, {Component} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

// React Navigation imports
import {withNavigationFocus} from 'react-navigation';

// Custom imports
import {colors} from './appStyles';

class ProgressBar extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			percentage: new Animated.Value(0),
			animationDuration: 2500,
			width: 0
		};
	}

	refresh()
	{
		Animated.timing(this.state.percentage,
		{
			toValue: Math.min(Math.max(0, this.props.percentage * 100), 100),
			easing: Easing.bezier(0, 0.75, 0.25, 1),
			duration: this.state.animationDuration,
			delay: this.props.initialDelay + (this.state.animationDuration / 10 * this.props.listOrder)
		}).start();
	}

	render()
	{
		if (this.props.isFocused)
			this.refresh();

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
								inputRange: [0, this.props.percentage * 100],
								outputRange: [0, this.state.width * this.props.percentage]
							})
						}
					]}
				/>
			</View>
		);
	}
}
export default withNavigationFocus(ProgressBar);

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
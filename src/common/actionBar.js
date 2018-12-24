// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors} from './appStyles';

export default class ActionBar extends Component
{
	render()
	{
		var barStyle = styles.bar;
		var titleStyle = styles.titleText;

		if (this.props.inverted == true)
		{
			if (this.props.lifted)
				barStyle = styles.liftedIBar
			else
				barStyle = styles.iBar;

			titleStyle = styles.iTitleText;
		}

		return(
			<View style = {barStyle}>
				<View>
					{this.props.leftButton}
				</View>
				<View style = {styles.title}>
					<Text style = {titleStyle}>{this.props.title}</Text>
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
		height: 56,
		// elevation: 10
	},
	iBar:
	{
		alignItems: 'flex-start',
		flexDirection: 'row',
		backgroundColor: colors.spaceColor,
		height: 56
	},
	liftedIBar:
	{
		alignItems: 'flex-start',
		flexDirection: 'row',
		backgroundColor: colors.spaceColor,
		height: 56,
		elevation: 3
	},
	title:
	{
		flex: 1,
		marginHorizontal: 12,
		marginTop: 14,
		marginBottom: 10,
		justifyContent: 'center'
	},
	titleText:
	{
		color: colors.titleAndIconColor,
		fontSize: 24,
		fontFamily: 'Lato-Bold'
	},
	iTitleText:
	{
		color: colors.primaryColor,
		fontSize: 24,
		fontFamily: 'Lato-Bold'
	}
});
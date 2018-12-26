// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, IconButton} from 'gradeAid/src/common';

export default class ThemesPage extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {scrolled: false};
	}
	
	render()
	{
		const scrollToggle = (event) =>
		{
			if (event.nativeEvent.contentOffset.y != 0)
			{
				if (!this.state.scrolled)
					this.setState({scrolled: true})
			}
			else
			{
				if (this.state.scrolled)
					this.setState({scrolled: false})
			}
		}

		return (
			<View style = {containerStyle.default}>
				<ActionBar
					inverted = {true}
					lifted = {this.state.scrolled}
					leftButton =
					{
						<IconButton
							type = 'arrow-back'
							size = {30}
							color = {colors.primaryColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					title = "Themes"
				/>
				<ScrollView
					keyboardShouldPersistTaps = 'handled'
					onScroll = {scrollToggle}
				>

				</ScrollView>
			</View>
		);
	}
}
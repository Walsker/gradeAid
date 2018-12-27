// React Native imports
import React, {Component} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Divider, IconButton} from 'gradeAid/src/common';

export default class AboutPage extends Component
{
	render()
	{
		return(
			<View style = {containerStyle.default}>
				<ActionBar
					leftButton =
					{
						<IconButton
							type = 'menu'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {this.props.navigation.openDrawer}
						/>
					}
					title = {"About"}
				/>
				<View style = {containerStyle.form}>
					<View style = {containerStyle.formSection}>
						<Text style = {textStyle.bold(70, 'center')}>Grade Aid</Text>
						<Text style = {textStyle.regular(16, 'center', colors.secondaryTextColor)}>v1.1</Text>
					</View>
					<View style = {containerStyle.formSection}>
						<Text style = {textStyle.regular(20, 'center')}>Created by Wal Wal</Text>
					</View>
					<Divider color = {colors.dividerColor} separation = {10} style = {{marginTop: 0}}/>
					<View style = {containerStyle.formSection}>
						<Text style = {textStyle.light(20, 'center')}>Found a bug? Feedback? Feature Requests?</Text>
						<View style = {{marginVertical: 5}}/>
						<View style = {containerStyle.roundedBox}>
							<Text style = {textStyle.regular(24, 'center')}>Contact me at</Text>
							<TouchableOpacity
								onPress = {() => Linking.openURL('mailto:wal.gatlei@gmail.com?subject=[Grade Aid]').catch(err => console.log('Could not open mail app.', err))}
							>
								<View style = {{marginVertical: 10}}>
									<Text style = {textStyle.regular(30, 'center', colors.primaryColor)}>wal.gatlei@gmail.com</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style = {containerStyle.roundedBox}>
							<Text style = {textStyle.regular(24, 'center')}>Github</Text>
							<TouchableOpacity
								onPress = {() => Linking.openURL('https://github.com/walsker').catch(err => console.log('Could not open browser.', err))}
							>
								<View style = {{marginVertical: 10}}>
									<Text style = {textStyle.regular(30, 'center', colors.primaryColor)}>github.com/walsker</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
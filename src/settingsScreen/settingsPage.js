// React Native imports
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {containerStyle, textStyle} from 'easyGrades/src/common/appStyles';

class SettingsPage extends Component
{
	render()
	{

		return(
			<View style = {containerStyle.page}>
				<Text style = {textStyle.regular(28, 'center')}>Settings Page</Text>
				<Button
					title = "ERASE DATA"
					onPress = {() => {}}
				/>
			</View>
		);
	}
}

export default connect()(SettingsPage);
// React Native imports
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {eraseAppData} from 'easyGrades/src/appRedux/actions';

// Custom imports
import {containerStyle, textStyle} from 'easyGrades/src/common/appStyles';

class SettingsPage extends Component
{
	render()
	{
		const eraseStore = () =>
		{
			this.props.eraseAppData();
		};

		return(
			<View style = {containerStyle.page}>
				<Text style = {textStyle.regular(28, 'center')}>Settings Page</Text>
				<Button
					title = "ERASE DATA"
					onPress = {eraseStore}
				/>
			</View>
		);
	}
}

export default connect(null, {eraseAppData})(SettingsPage);
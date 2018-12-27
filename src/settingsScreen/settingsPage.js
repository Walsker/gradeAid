// React Native imports
import React, {Component} from 'react';
import {Alert, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {eraseAppData} from './redux/actions';

// Custom imports
import {colors, containerStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, IconButton} from 'gradeAid/src/common';
import MenuItem from './_components/menuItem';

class SettingsPage extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			darkMode: false
		}
	}

	toggleDarkMode()
	{
		this.setState(prevState => {return {darkMode: !prevState.darkMode};});
	}

	eraseData()
	{
		this.props.eraseAppData();
		this.props.navigation.navigate("No Semesters");
	}

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
					title = {"Settings"}
				/>
				<View style = {{marginBottom: 5}}/>
				<MenuItem
					title = "Dark Mode"
					color = {colors.primaryTextColor}
					switchable = {true}
					switchValue = {this.state.darkMode}
					action = {this.toggleDarkMode.bind(this)}
				/>
				<MenuItem
					title = "Erase App Data"
					color = 'red'
					action = {() =>
					{
						Alert.alert(
							"Erase App Data",
							"Are you sure you would like erase all your data?\n\nThis action cannot be undone.",
							[
								{
									text: 'Yes',
									onPress: this.eraseData.bind(this),
									style: 'cancel'
								},
								{text: 'No', onPress: () => {}},
							],
							{cancelable: true}
						);
					}}
				/>
			</View>
		);
	}
}

export default connect(null, {eraseAppData})(SettingsPage);
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
				<View style = {{marginVertical: 5}}/>
				<MenuItem
					title = "Letter Grade System"
					color = {colors.primaryTextColor}
					action = {() =>
					{
						this.props.navigation.navigate("GradeSystemPage");
					}}
				/>
				<MenuItem
					title = "Themes"
					color = {colors.primaryTextColor}
					action = {() =>
					{
						this.props.navigation.navigate("ThemesPage");
					}}
				/>
				<MenuItem
					title = "Erase App Data"
					color = 'red'
					action = {() =>
					{
						Alert.alert(
							"Erase App Data",
							"Are you sure you would like erase all your data? This action cannot be undone.",
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
// React Native imports
import React, {Component} from 'react';
import {Alert, Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {eraseUserData} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Divider, IconButton} from 'gradeAid/src/common';

class AboutPage extends Component
{
	constructor(props)
	{
		super(props);

		this.showAlert = this.showAlert.bind(this);
	}
	
	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Erase User Data":
				Alert.alert(
					"Erase All Data",
					"Are you sure you would like to do this?\nThis cannot be undone.",
					[
						{text: 'Yes', onPress: () => {this.props.navigation.navigate("Semester"); this.props.eraseUserData}, style: 'cancel'},
						{text: 'No', onPress: () => {}},
					],
				);
				return;
		}
	}
	render()
	{
		return (
			<View style = {containerStyle.default}>
				<ActionBar
					color = {colors.primaryColor}
					leftButton =
					{
						<IconButton
							type = 'menu'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {this.props.navigation.openDrawer}
						/>
					}
				>
					<Text style = {textStyle.thick(24, 'left', 'white')}>About</Text>
				</ActionBar>
				<ScrollView>
					<View style = {containerStyle.form}>
						<View style = {containerStyle.formSection}>
							<Text style = {textStyle.bold(70, 'center')}>Grade Aid</Text>
							<Text style = {textStyle.regular(15, 'center', colors.secondaryTextColor)}>v1.2</Text>
						</View>
						<View style = {containerStyle.formSection}>
							<Text style = {textStyle.regular(21, 'center')}>Created by Wal Wal</Text>
						</View>
						<Divider color = {colors.dividerColor} separation = {10} style = {{marginTop: 0}}/>
						<View style = {containerStyle.formSection}>
							<View style = {{marginVertical: 5}}/>
							<View style = {containerStyle.roundedBox}>
								<Text style = {textStyle.regular(18, 'center')}>Contact me</Text>
								<TouchableOpacity
									onPress = {() => Linking.openURL('mailto:wal.gatlei@gmail.com?subject=[Grade Aid]').catch(err => console.log('Could not open mail app.', err))}
								>
									<View style = {{marginVertical: 10}}>
										<Text style = {textStyle.regular(21, 'center', colors.primaryColor)}>wal.gatlei@gmail.com</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style = {containerStyle.roundedBox}>
								<Text style = {textStyle.regular(18, 'center')}>Github</Text>
								<TouchableOpacity
									onPress = {() => Linking.openURL('https://github.com/walsker').catch(err => console.log('Could not open browser.', err))}
								>
									<View style = {{marginVertical: 10}}>
										<Text style = {textStyle.regular(21, 'center', colors.primaryColor)}>github.com/walsker</Text>
									</View>
								</TouchableOpacity>
							</View>
							<Divider color = {colors.dividerColor} separation = {20}/>
							<View style = {[containerStyle.roundedBox, {borderColor: '#FF0000', backgroundColor: '#FF000011'}]}>
								<TouchableOpacity
									onPress = {() => this.showAlert("Erase User Data")}
								>
									<View style = {{marginVertical: 10}}>
										<Text style = {textStyle.bold(21, 'center', 'red')}>Erase App Data</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default connect(null, {eraseUserData})(AboutPage);
// React Native imports
import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {createSemester} from 'gradeAid/src/userData/actions';
import {selectSemester} from 'gradeAid/src/navDrawer/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton, TextField} from 'gradeAid/src/common';

class NewSemesterForm extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {_semesterName: ""};

		this.showAlert = this.showAlert.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Unnamed Semester":

				Alert.alert(
					"Incomplete",
					"Please be sure to give your semester a name.",
					[
						{text: 'OK', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;

			case "Semester already exists":

				Alert.alert(
					"Semester Already Exists",
					"Please give your new semester a different name.",
					[
						{text: 'OK', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;
		}
	}
	
	setSelectedSemester()
	{
		let newID = 0;
		while (true)
		{
			if (this.props.semesterList[newID] == undefined)
				break;
			else
				newID++;
		}
		this.props.selectSemester(newID);
	}

	onSubmit()
	{
		let semesterName = this.state._semesterName.trim();

		if (semesterName == "")
		{
			this.showAlert("Unnamed Semester");
		}
		else
		{
			for (id in this.props.semesterList)
			{
				if (this.props.semesterList[id].name == semesterName)
				{
					this.showAlert("Semester already exists");
					return;
				}
			}

			let newID = 0;
			while (true)
			{
				if (this.props.semesterList[newID] == undefined)
					break;
				else
					newID++;
			}

			this.props.navigation.navigate("Semester");
			this.props.createSemester(semesterName);
			this.setSelectedSemester();
		}
	}

	render()
	{
		return (
			<View style = {containerStyle.page}>
				<ActionBar
					color = {colors.spaceColor}
					leftButton =
					{
						<IconButton
							type = 'close'
							size = {30}
							color = {colors.primaryColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
				>
					<Text style = {textStyle.thick(24, 'left', colors.primaryColor)}>New Semester</Text>
				</ActionBar>
				<View style = {containerStyle.form}>
					<View style = {containerStyle.formSection}>
						<Text style = {textStyle.regular(22, 'center')}>What would you like this semester to be named?</Text>
					</View>
					<View style = {containerStyle.formSection}>
						<TextField
							fontSize = {24}
							maxLength = {25}
							label = "Semester Name"
							textAlign = 'center'
							textColor = {colors.primaryTextColor}
							autoFocus = {true}
							placeholder = "i.e. Fall 2018"
							onChangeText = {(newText) => this.setState({_semesterName: newText})}
							onSubmitEditing = {this.onSubmit.bind(this)}
						/>
					</View>
					<View style = {containerStyle.formSection}>
						<Button
							label = "Submit"
							color = {colors.accentColor}
							inverted = {false}
							action = {this.onSubmit.bind(this)}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		semesterList: state.semesterList
	};
}
export default connect(mapStateToProps, {createSemester, selectSemester})(NewSemesterForm);
// React Native imports
import React, {Component} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editSemester, deleteSemester} from 'gradeAid/src/userData/actions';
import {selectSemester} from 'gradeAid/src/navDrawer/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton, TextField} from 'gradeAid/src/common';

class EditSemesterForm extends Component
{
	constructor(props)
	{
		super(props);
		this.showAlert = this.showAlert.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state =
		{
			// The tentative new semester name
			semesterName: props.semesterList[props.selectedSemester].name,
			_newSemesterName: props.semesterList[props.selectedSemester].name
		};
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

			case "Delete Semester":

				Alert.alert(
					"Delete Semester",
					"Are you sure you would like delete this semester?\n\nThis action cannot be undone.",
					[
						{
							text: 'Yes',
							onPress: this.onDelete,
							style: 'cancel'
						},
						{text: 'No', onPress: () => {}},
					],
					{cancelable: true}
				);
				break;
		}
	}

	onDelete()
	{
		let semesterToBeDeleted = this.props.selectedSemester;
		let prevSemester = -1;
		for (id in this.props.semesterList)
		{
			if (id != this.props.selectedSemester)
				prevSemester = id;
		}
		
		this.props.navigation.navigate("Semesters");
		this.props.selectSemester(prevSemester == -1 ? 0 : prevSemester);
		this.props.deleteSemester(semesterToBeDeleted);
	}

	onSubmit()
	{
		var newSemesterName = this.state._newSemesterName.trim();

		if (newSemesterName == "")
		{
			this.showAlert("Unnamed Semester");
		}
		else
		{
			if (this.state.semesterName == newSemesterName)
			{
				this.props.navigation.pop();
				return;
			}

			for (id in this.props.semesterList)
			{
				if (this.props.semesterList[id].name == newSemesterName)
				{
					this.showAlert("Semester already exists");
					return;
				}
			}

			Alert.alert(
				"Confirm",
				"Your semester will be renamed to " + newSemesterName + ", are you sure?",
				[
					{
						text: 'Yes',
						onPress: () =>
						{
							this.props.editSemester(this.props.selectedSemester, {name: newSemesterName});
							this.props.navigation.pop();
						},
						style: 'cancel'
					},
					{text: 'No', onPress: () => {}},
				]
			)
		}
	}

	render()
	{
		return (
			<View style = {containerStyle.default}>
				<ActionBar
					inverted = {true}
					leftButton =
					{
						<IconButton
							type = 'close'
							size = {30}
							color = {colors.primaryColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					title = "Edit Semester"
				/>
				<View style = {containerStyle.form}>
					<View style = {containerStyle.formSection}>
						<Text style = {textStyle.regular(22, 'center')}>
							Rename
							<Text style = {{color: colors.accentColor}}> {this.state.semesterName} </Text>
							by entering a new name below.
						</Text>
					</View>
					<View style = {containerStyle.formSection}>
						<TextField
							fontSize = {24}
							label = "Semester Name"
							textAlign = 'center'
							textColor = {colors.primaryTextColor}
							autoFocus = {true}
							defaultValue = {this.state.semesterName}
							onChangeText = {(newText) => this.setState({_newSemesterName: newText})}
							onSubmitEditing = {this.onSubmit}
						/>
						<Button
							label = "Submit"
							color = {colors.accentColor}
							inverted = {false}
							action = {this.onSubmit}
						/>
					</View>
					<View style = {containerStyle.formSection}>
						<View style = {{marginVertical: 10}}>
							<Text style = {textStyle.regular(22, 'center')}>
								Delete
								<Text style = {{color: 'red'}}> {this.state.semesterName} </Text>
								by pressing the button below.
							</Text>
						</View>
						<Button
							label = "Delete Semester"
							color = {'red'}
							inverted = {false}
							action = {() => this.showAlert("Delete Semester")}
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
		semesterList: state.semesterList,
		selectedSemester: state.selectedSemester
	};
}
export default connect(mapStateToProps, {editSemester, deleteSemester, selectSemester})(EditSemesterForm);
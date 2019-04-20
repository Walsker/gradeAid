// React Native imports
import React, {Component} from 'react';
import {Alert, Keyboard, Modal, TouchableWithoutFeedback, Text, TextInput, TouchableNativeFeedback, Vibration, View} from 'react-native';

// React Navigation imports
import {withNavigationFocus} from 'react-navigation';

// Redux imports
import {connect} from 'react-redux';
import {selectAssessment} from 'gradeAid/src/navDrawer/actions';
import {editAssessment, deleteAssessment} from 'gradeAid/src/userData/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {Button} from 'gradeAid/src/common';

const EMPTY_ASSESSMENT = {name: '', grade: 0, weight: 0};

class AssessmentList extends Component
{
	constructor(props)
	{
		super(props);

		this.showAlert = this.showAlert.bind(this);
		this.deleteAssessment = this.deleteAssessment.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.createAssessment = this.createAssessment.bind(this);

		this.state = 
		{
			editable: false,
			modalVisible: false,
			selected: EMPTY_ASSESSMENT,
			newGrade: EMPTY_ASSESSMENT.grade,
			newWeight: EMPTY_ASSESSMENT.weight,
		};
	}

	showAlert(alertType)
	{
		switch (alertType)
		{
			case "Delete Assessment":

				Alert.alert(
					"Delete Assessment",
					"Are you sure you would like to delete this assessment?",
					[
						{text: 'Yes', onPress: this.deleteAssessment},
						{text: 'No', onPress: () => {}},
					]
				);
				break;
			
			case "No Grade Provided":

				Alert.alert(
					"No Grade Entered",
					"Please enter a valid grade.",
					[{text: 'OK', onPress: () => this.gradeInput.focus()}],
					{cancelable: true}
				);
				return;

			case "No Weight Provided":

				Alert.alert(
					"No Weight Entered",
					"Please enter a valid weight.",
					[{text: 'OK', onPress: () => this.weightInput.focus()}],
					{cancelable: true}
				);
				return;

			case "Weight Exceeds 100%":
					
				Alert.alert(
					"Weight Exceeds 100%",
					"Please enter a valid weight.",
					[{text: 'OK', onPress: () => {}}]
				);
				return;

			case "Negative Values":

				Alert.alert(
					"Negative Values",
					"Please enter positive values",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;

			case "Missing Values":

				Alert.alert(
					"Missing Values",
					"Please input all required values.",
					[{text: 'OK', onPress: () => {}}],
					{cancelable: true}
				);
				return;
		}
	}

	deleteAssessment()
	{
		let id = this.state.selected._id;
		this.setVisibility(false);
		this.props.deleteAssessment(id);
	}

	saveEdit()
	{
		if (this.state.newGrade == this.state.selected.grade && this.state.newWeight == this.state.selected.weight)
		{
			this.setState({editable: false});
			return;
		}
		// Checking if the grade is valid
		if (this.state.newGrade === "")
		{
			this.showAlert("No Grade Provided");
			return;
		}

		// Checking if a valid weight was inputted
		if (this.state.newWeight === "")
		{
			this.showAlert("No Weight Provided");
			return;
		}
		else if (this.state.newWeight > 1)
		{
			this.showAlert("Weight Exceeds 100%");
			return;
		}
		else
		{
			let selected =
			{
				name: this.state.selected.name,
				grade: this.state.newGrade,
				weight: this.state.newWeight
			};

			this.setState({editable: false, selected});
			this.props.editAssessment(this.state.selected._id, {grade: this.state.newGrade, weight: this.state.newWeight});
		}
	}

	setVisibility(newVisibility, assessment)
	{
		this.setState({
			modalVisible: newVisibility,
			selected: assessment ? assessment : EMPTY_ASSESSMENT,
			newGrade: assessment ? assessment.grade : EMPTY_ASSESSMENT.grade,
			newWeight: assessment ? assessment.weight : EMPTY_ASSESSMENT.weight
		});
	}

	infoModal()
	{
		const emptySpace = () =>
		{
			return (
				<TouchableWithoutFeedback
					onPress = {() => {this.setState({editable: false}); this.setVisibility(false)}}
				>
					<View style = {{flex: 1.1, backgroundColor: '#00000000', width: '100%'}}/>
				</TouchableWithoutFeedback>
			);
		};

		const toNumber = (string, fallback) =>
		{
			if (string === "") return "";

			var attempt = parseFloat(string);
			if (Number(attempt) === attempt)
				return attempt / 100;
			else
				return fallback;
		};

		const gradeField = () =>
		{
			if (!this.state.editable)
				return (
					<Text style = {textStyle.thick(36, 'center')}>
						{Math.round(this.state.selected.grade * 10000) / 100}
						<Text style = {textStyle.thick(22, 'center')}>%</Text>
					</Text>
				);
			else
			{
				return (
					<View style = {{flexDirection: 'row', alignItems: 'center'}}>
						<TextInput
							ref = {input => this.gradeInput = input}
							defaultValue = {(Math.round(this.state.selected.grade * 10000) / 100).toString()}
							fontSize = {36}
							keyboardType = 'numeric'
							onChangeText = {(newText) => {
								this.setState(prevState => {return {newGrade: toNumber(newText, prevState.newGrade)};});
							}}
							onSubmitEditing = {Keyboard.dismiss}
							returnKeyType = 'done'
							style = {textStyle.thick(36, 'center')}
							underlineColorAndroid = {colors.primaryTextColor}
						/>
						<Text style = {textStyle.thick(22, 'center')}>%</Text>
					</View>
				);
			}
		};

		const weightField = () =>
		{
			let {weight} = this.state.selected;

			if (!this.state.editable)
				return (
					<Text style = {textStyle.thick(36, 'center')}>
						{Math.round(weight * 10000) / 100}
						<Text style = {textStyle.thick(22, 'center')}>%</Text>
					</Text>
				);
			else
			{
				return (
					<View style = {{flexDirection: 'row', alignItems: 'center'}}>
						<TextInput
							ref = {input => this.weightInput = input}
							defaultValue = {(Math.round(weight * 10000) / 100).toString()}
							fontSize = {36}
							keyboardType = 'numeric'
							onChangeText = {(newText) => {
								this.setState(prevState => {return {newWeight: toNumber(newText, prevState.newWeight)};});
							}}
							onSubmitEditing = {Keyboard.dismiss}
							returnKeyType = 'done'
							style = {textStyle.thick(36, 'center')}
							underlineColorAndroid = {colors.primaryTextColor}
						/>
						<Text style = {textStyle.thick(22, 'center')}>%</Text>
					</View>
				);
			}
		};

		const background = () =>
		{
			return (
				<Modal
				animationType = 'fade'
				onRequestClose = {() => this.setVisibility(false)}
				transparent = {true}
				visible = {this.state.modalVisible}
				>
					<View style = {{flex: 1, backgroundColor: '#00000088'}}/>
				</Modal>
			);
		};

		const slideTile = () =>
		{
			return (
				<Modal
					animationType = 'slide'
					onRequestClose = {() => this.setVisibility(false)}
					transparent = {true}
					visible = {this.state.modalVisible}
				>
					<View style = {{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						{emptySpace()}
						<View style = {{
							flex: 1,
							backgroundColor: colors.spaceColor,
							justifyContent: 'space-between',
							alignItems: 'center',
							borderTopLeftRadius: 30,
							borderTopRightRadius: 30,
							paddingHorizontal: 10,
							paddingVertical: 25,
							width: '100%'
						}}>
							<Text style = {textStyle.bold(42, 'center', colors.primaryColor)}>{this.state.selected.name}</Text>
							<Text style = {textStyle.light(22, 'center', colors.darkPrimaryColor)}>Grade</Text>
							{gradeField()}
							<Text style = {textStyle.light(22, 'center', colors.darkPrimaryColor)}>Weight</Text>
							{weightField()}
							<View>
								<Button
									label = {this.state.editable ? 'Save' : 'Edit'}
									inverted = {this.state.editable ? true : false}
									color = {colors.primaryColor}
									action = {this.state.editable ? this.saveEdit : () => this.setState({editable: true})}
								/>
								<Button
									label = 'Delete'
									color = 'red'
									action = {() => this.showAlert("Delete Assessment")}
								/>
							</View>
						</View>
					</View>
				</Modal>
			);
		};

		return (
			<View style = {{flex: 1}}>
				{background()}
				{slideTile()}
			</View>
		);
	}
	
	createAssessment(assessment, animationID)
	{
		if (!assessment)
			return <View key = {animationID}/>;

		return (
			<TouchableNativeFeedback
				key = {animationID}
				background = {TouchableNativeFeedback.Ripple(colors.darkPrimaryColor, false)}
				onPress = {() => {Vibration.vibrate(50); this.setVisibility(true, assessment)}}
			>
				<View style = 
				{{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 25,
					paddingVertical: 15
				}}>
					<Text style = {textStyle.regular(20)}>{assessment.name}</Text>
					<Text style = {textStyle.regular(20)}>{(Math.round(assessment.grade*1000)/10) + "%"}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}

	render()
	{
		const divider = (id) =>
		{
			return <View key = {id} style = {{backgroundColor: colors.dividerColor, height: 2}}/>;
		}

		let components = [divider(0)];
		this.props.assessments.forEach((assessment, i) =>
		{
			components.push(this.createAssessment(assessment, i+1));
			components.push(divider(-1*(i+1)));
		});

		return (
			<View style = {containerStyle.assessmentList}>
				{this.infoModal()}
				{components}
			</View>
		);
	}
}

export default connect(null, {editAssessment, deleteAssessment, selectAssessment})(withNavigationFocus(AssessmentList));
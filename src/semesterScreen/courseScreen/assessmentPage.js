// React Native imports
import React, {Component} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {editAssessment, deleteAssessment} from 'gradeAid/src/userData/actions';

// Custon imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, CheckList, IconButton, Tile} from 'gradeAid/src/common';

class AssessmentPage extends Component
{
	showAlert(alertType)
	{
		switch(alertType)
		{
			case "Delete Assessment":

				Alert.alert(
					"Delete Assessment",
					"Are you sure you would like to delete this grade?\n\nThis action cannot be undone.",
					[
						{text: 'Yes', onPress: this.deleteAssessment.bind(this), style: 'cancel'},
						{text: 'No', onPress: () => {}},
					],
					{cancelable: true}
				);
				return;
		}
	}

	deleteAssessment()
	{
		this.props.navigation.navigate("Course");
		this.props.deleteAssessment(this.props.selectedAssessment);
	}

	render()
	{
		if (!this.props.assessment)
			return <View/>;

		return (
			<View style = {containerStyle.default}>
				<ActionBar
					leftButton =
					{
						<IconButton
							type = 'arrow-back'
							size = {30}
							color = {colors.titleAndIconColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					title = {this.props.assessment.name}
				/>
				<ScrollView style = {containerStyle.tileList}>
					<Tile title = "Grade">
						<Text style = {textStyle.regular(130, 'center')}>
							<Text style = {textStyle.regular(65, 'center', colors.spaceColor)}>%</Text>
							{Math.round(this.props.assessment.grade * 1000) / 10}
							<Text style = {textStyle.regular(65)}>%</Text>
						</Text>
					</Tile>
					<Tile title = "Weight">
						<Text style = {textStyle.regular(50, 'center')}>
							<Text style = {textStyle.regular(25, 'center', colors.spaceColor)}>%</Text>
							{Math.round(this.props.assessment.weight * 1000) / 10}
							<Text style = {textStyle.regular(25)}>%</Text>
						</Text>
					</Tile>
					<Tile title = "Made a mistake?">
						<Button
							label = "Edit Assessment"
							color = {colors.primaryColor}
							inverted = {false}
							action = {() => this.props.navigation.navigate("EditAssessmentPage")}
						/>
					</Tile>
					<Tile title = "Delete Assessment">
						<Button
							label = "Delete Assessment"
							color = {'red'}
							inverted = {false}
							action = {() => this.showAlert("Delete Assessment")}
						/>
					</Tile>
					<View style = {{height: 10}}/>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		selectedAssessment: state.selectedAssessment,
		assessment: state.assessmentList[state.selectedAssessment]
	};
}
export default connect(mapStateToProps, {editAssessment, deleteAssessment})(AssessmentPage);
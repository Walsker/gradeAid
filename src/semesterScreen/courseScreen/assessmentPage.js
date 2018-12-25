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

	hideAssessment()
	{
		this.props.editAssessment(this.props.selectedAssessment, {hidden: !this.props.assessment.hidden});
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
					<Tile
						title = "Grade"
						content =
						{
							<View>
								<Text style = {textStyle.regular(150, 'center')}>
									<Text style = {textStyle.regular(75, 'center', colors.spaceColor)}>%</Text>
									{Math.round(this.props.assessment.grade * 1000) / 10}
									<Text style = {textStyle.regular(75)}>%</Text>
								</Text>
							</View>
						}
					/>
					<Tile
						title = "Weight"
						content =
						{
							<View>
								<Text style = {textStyle.regular(50, 'center')}>
									<Text style = {textStyle.regular(25, 'center', colors.spaceColor)}>%</Text>
									{Math.round(this.props.assessment.weight * 1000) / 10}
									<Text style = {textStyle.regular(25)}>%</Text>
								</Text>
							</View>
						}
					/>
					<Tile
						title = "Made a mistake?"
						content =
						{
							<Button
								label = "Edit Assessment"
								color = {colors.primaryColor}
								inverted = {false}
								action = {() => this.props.navigation.navigate("EditAssessmentPage")}
							/>
						}
					/>
					<Tile
						title = "Hide Assessment"
						content =
						{
							<View>
								<CheckList
									style = {{alignSelf: 'center', paddingVertical: 0}}
									color = {colors.accentColor}
									fontSize = {16}
									labels = {["Pretend like this assessment never existed."]}
									values = {[this.props.assessment.hidden]}
									onItemToggle = {id => this.hideAssessment()}
								/>
							</View>
						}
					/>
					<Tile
						title = "Delete Assessment"
						content =
						{
							<Button
								label = "Delete Assessment"
								color = {'red'}
								inverted = {false}
								action = {() => this.showAlert("Delete Assessment")}
							/>
						}
					/>
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
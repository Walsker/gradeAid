// React Native imports
import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {deleteCourse} from 'gradeAid/src/userData/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ActionBar, Button, IconButton} from 'gradeAid/src/common';
import * as Assessment from 'gradeAid/src/semesterScreen/assessmentTypes';

class CourseInfoPage extends Component
{
	showAlert(alertType)
	{
		switch(alertType)
		{
			case "Drop Course":

				Alert.alert(
					"Drop Course",
					"Are you sure you would like to drop this course?\nThis action cannot be undone.",
					[
						{text: 'Yes', onPress: this.dropCourse.bind(this), style: 'cancel'},
						{text: 'No', onPress: () => {}},
					],
					{cancelable: true}
				);
				return;
		}
	}

	dropCourse()
	{
		this.props.navigation.navigate("Semester");
		this.props.deleteCourse(this.props.selectedCourse);
	}


    render()
    {
		if (!this.props.course)
			return <View/>;

        var breakdownComponents = [];
		for (i in this.props.course.breakdown)
		{
			if (this.props.course.breakdown[i] != 0)
			{
				breakdownComponents.push(
					<View key = {i} style = {{marginVertical: 5}}>
						<Text style = {textStyle.regular(24, 'center')}>
							{Assessment.pluralTypes[i] + " - " + (this.props.course.breakdown[i] * 100) + "%"}
						</Text>
					</View>
				);
			}
        }
        
        return (
            <View style = {containerStyle.default}>
				<ActionBar
					inverted = {true}
					leftButton =
					{
						<IconButton
							type = 'arrow-back'
							size = {30}
							color = {colors.primaryColor}
							action = {() => this.props.navigation.pop()}
						/>
					}
					title = "Course Info"
				/>
				<View style = {containerStyle.form}>
                    <View style = {containerStyle.formSection}>
                        <Text style = {textStyle.bold(42, 'center', colors.primaryColor)}>{this.props.course.name}</Text>
                        <View style = {{paddingVertical: 10}}>
							<Text style = {textStyle.light(24, 'center', colors.darkPrimaryColor)}>Mark Breakdown</Text>
						</View>
                    </View>
                    <View style = {containerStyle.formSection}>
						<View style = {containerStyle.roundedBox}>
							{breakdownComponents}
						</View>
					</View>
					<View style = {containerStyle.formSection}>
						<Button
							label = "Edit Course"
							color = {colors.accentColor}
							inverted = {false}
							action = {() => this.props.navigation.navigate("EditCoursePage")}
						/>
					</View>
					<View style = {containerStyle.formSection}>
						<Button
							label = "Drop Course"
							color = {'red'}
							inverted = {false}
							action = {() => {this.showAlert("Drop Course")}}
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
        selectedCourse: state.selectedCourse,
        course: state.courseList[state.selectedCourse]
    };
}
export default connect(mapStateToProps, {deleteCourse})(CourseInfoPage);
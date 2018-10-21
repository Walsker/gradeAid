// React Native imports
import React, {Component} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {newSemester} from 'easyGrades/src/appRedux/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton} from 'easyGrades/src/common';

class NewSemesterPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {_semesterName: ""};
    }
    
    showAlert(alertType)
    {
        if (alertType == "Unnamed Semester")
        {
            Alert.alert(
                "Incomplete",
                "Please be sure to give your semester a name.",
                [
                    {text: 'OK', onPress: () => {}},
                ],
                {cancelable: true}
            );
        }
        else if (alertType = "Semester already exists")
        {
            Alert.alert(
                "Semester Already Exists",
                "Please give your new semester a different name.",
                [
                    {text: 'OK', onPress: () => {}},
                ],
                {cancelable: true}
            );
        }
    }

    render()
    {
        return(
            <View style = {containerStyle.page}>
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
                    title = "New Semester"
                />
                <View style = {containerStyle.form}>
                    <View style = {containerStyle.formSection}>
                        <Text style = {textStyle.regular(22, 'center')}>What would you like this semester to be named?</Text>
                    </View>
                    <View style = {containerStyle.formSection}>
                        <TextInput
                            placeholder = "i.e. Fall 2018"
                            placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                            underlineColorAndroid = {colors.primaryTextColor}
                            style = {textStyle.regular(24, 'center')}
                            onChangeText = {(newText) => this.setState({_semesterName: newText})}
                        />
                        <Text style = {[textStyle.regular(14, 'center')]}>
                            Semester Name
                        </Text>
                    </View>
                    <View style = {containerStyle.formSection}>
                        <Button
                            color = {colors.accentColor}
                            title = "    Finish    "
                            onPress = {() => {
                                var semesterName = this.state._semesterName.trim();

                                if (semesterName == "")
                                {
                                    this.showAlert("Unnamed Semester");
                                }
                                else
                                {
                                    for (i in this.props.semesters)
                                    {
                                        if (this.props.semesters[i].name == semesterName)
                                        {
                                            this.showAlert("Semester already exists");
                                            return;
                                        }
                                    }
                                    this.props.newSemester(semesterName);
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) =>
{
    return {semesters: state.semesters};
}
export default connect(mapStateToProps, {newSemester})(NewSemesterPage);
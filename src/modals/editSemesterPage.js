// React Native imports
import React, {Component} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {renameSemester} from 'easyGrades/src/appRedux/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton} from 'easyGrades/src/common';

class EditSemesterPage extends Component
{
    constructor(props)
    {
        super(props);

        var currentSemester = this.props.navigation.getParam('semester', {});
        this.state = 
        {
            semester: currentSemester,
            _newSemesterName: currentSemester.name
        };
    }

    render()
    {
        return(
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
                    title = "Edit Semester"
                />
                <View style = {containerStyle.form}>
                    <View style = {containerStyle.formSection}>
                        <Text style = {textStyle.regular(22, 'center')}>Rename {this.state.semester.name} by entering a new name below.</Text>
                    </View>
                    <View style = {containerStyle.formSection}>
                        <TextInput
                            defaultValue = {this.state.semester.name}
                            underlineColorAndroid = {colors.primaryTextColor}
                            style = {textStyle.regular(24, 'center')}
                            onChangeText = {(newText) => this.setState({_newSemesterName: newText})}
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
                                console.log(this.state._newSemesterName);
                                var semesterName = this.state._newSemesterName.trim();

                                if (semesterName == "")
                                {
                                    alert("Invalid semester name.")
                                }
                                else
                                {
                                    for (i in this.props.semesters)
                                    {
                                        if (this.props.semesters[i].name == semesterName)
                                        {
                                            console.log(this.props.semesters[i].name, semesterName)
                                            this.props.navigation.pop();
                                            return;
                                        }
                                    }

                                    Alert.alert(
                                        "Confirm",
                                        "Your semester will be renamed to " + this.state._newSemesterName + ", are you sure?",
                                        [
                                          {text: 'Yes', onPress: () => this.props.renameSemester(this.state.semester, semesterName), style: 'cancel'},
                                          {text: 'No', onPress: () => {}},
                                        ]
                                    )
                                }
                            }}
                        />
                    </View>
                </View>
                <Text>{this.state.semester.name}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) =>
{
    return {semesters: state.semesters};
}
export default connect(mapStateToProps, {renameSemester})(EditSemesterPage);
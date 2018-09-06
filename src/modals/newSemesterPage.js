// React Native imports
import React, {Component} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

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
    
    render()
    {
        console.log(this.props.navigation.state);
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
                                    alert("Please name the semester.")
                                }
                                else
                                {
                                    for (i in this.props.semesters)
                                    {
                                        if (this.props.semesters[i].name == semesterName)
                                        {
                                            alert("Semester with same name exists");
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
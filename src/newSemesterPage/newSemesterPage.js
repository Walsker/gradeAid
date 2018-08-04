// React Native imports
import React, {Component} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {newSemester} from 'easyGrades/src/appRedux/actions';

// Custom Imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';

class NewSemesterPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            _semesterName: ""
        };
    }
    render()
    {
        var showNoSemestersPage = this.props.navigation.getParam('showNoSemesters', true);
        
        return(
            <View style = {containerStyle.page}>
                <View style = {containerStyle.rowBox}>
                    <TouchableOpacity 
                        onPress = {() => this.props.navigation.navigate("No Semesters", {showNoSemesters: showNoSemestersPage})}
                        style = {{paddingVertical: 5, paddingHorizontal: 70, marginBottom: -5}}
                    >
                        <Text style = {{fontFamily: 'Lato-Regular', color: colors.secondaryTextColor}}>
                            I don't want to add a new semester.
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {containerStyle.form}>
                    <View style = {containerStyle.formSection}>
                        <Text style = {textStyle.regular(22, 'center')}>What do you want to call this semester?</Text>
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
                                    this.props.navigation.goBack();
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
    return {
        semesters: state.semesters
    };
}
export default connect(mapStateToProps, {newSemester})(NewSemesterPage);
// React Native imports
import React, {Component} from 'react';
import {Alert, Button, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {newCourse} from 'easyGrades/src/appRedux/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {ActionBar, IconButton} from 'easyGrades/src/common';
import CheckList from './_components/checkList';
import AssessmentDetails from './_components/assessmentDetails';

class AddCoursePage extends Component
{
    constructor(props)
    {
        super(props);

        const types = ["Assignments", "Projects", "Essays", "Quizzes", 
            "Tests", "Midterms", "Labs", "Tutorials", "Discussion Groups", "Final Exam"];
        var emptyList = [];
        var emptyDetails = {};

        for (i in types) 
        {
            emptyList.push(false);
            if (types[i] != "Final Exam")
            {
                emptyDetails[types[i]] = {quantity: 1, weight: 0.0};
            }
            else
            {
                emptyDetails[types[i]] = {weight: 0.0};
            }
        }

        this.state = 
        {
            semester: this.props.navigation.getParam('semester', {}),
            currentScene: 0,
            assessmentTypes: types,
            selectedTypes: emptyList,
            assessmentDetails: emptyDetails,
            _courseType: "",
            _courseCode: "",
            courseName: ""
        };
    }

    showAlert(alertType, customText)
    {
        if (alertType == "Cancel Creation")
        {
            Alert.alert(
                "Cancel",
                "Are you sure you would like to cancel the course creation?",
                [
                    {text: 'Yes', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
                    {text: 'No', onPress: () => {}},
                ],
                {cancelable: false}
            );
        }
        else if (alertType == "Incomplete Course Code")
        {
            Alert.alert(
                "Incomplete",
                "Please be sure to fill both the Course Type and the Course Code.",
                [
                    {text: 'OK', onPress: () => {}},
                ],
                {cancelable: true}
            );
        }
        else if (alertType == "No Type Selection Made")
        {
            Alert.alert(
                "No Type Selection",
                "Please be sure to select at least one assessment type.",
                [
                    {text: 'OK', onPress: () => {}},
                ],
                {cancelable: true}
            );
        }
        else if (alertType == "Weight of 0")
        {
            Alert.alert(
                "Invalid Weight",
                customText + " has a weight of 0. Please input a larger value.",
                [
                    {text: 'OK', onPress: () => {}},
                ],
                {cancelable: true}
            );   
        }
        else if (alertType == "Weights don't add up")
        {
            Alert.alert(
                "Invalid Weight",
                "Oh no! All the weights don't add up to 100%",
                [
                    {text: 'OK', onPress: () => {}},
                ],
                {cancelable: true}
            );   
        }
    }

    renderBackButton()
    {
        return(
            <Button
                color = {colors.primaryColor}
                title = "    Back    "
                onPress = {() => this.setState(prevState =>
                {
                    return({currentScene: prevState.currentScene - 1});
                })}
            />
        );
    }

    renderForwardButton(action)
    {
        return(
            <View>
                <Button
                    color = {colors.primaryColor}
                    title = "    Next    "
                    onPress = {action}
                />
            </View>
        );
    }

    renderFinishButton()
    {
        var createCourseObject = () =>
        {
            var types = this.state.assessmentTypes;
            var assessments = [];
            for (i in types)
            {
                if (this.state.selectedTypes[i] == true)
                {
                    var assessmentName = types[i];
                    var assessmentInfo = this.state.assessmentDetails[types[i]];
                    
                    if (assessmentName != "Final Exam")
                    {
                        if (assessmentName == "Quizzes")
                        {
                            var assessmentName = "Quiz";
                        }
                        else
                        {
                            var assessmentName = assessmentName.slice(0, -1);
                        }

                        for (var j = 0; j < assessmentInfo.quantity; j++)
                        {
                            var assessmentNumber = " " + (j + 1).toString();
                            assessments.push({
                                name: assessmentName + assessmentNumber,
                                grade: 0,
                                weight: assessmentInfo.weight,
                                complete: false
                            });
                        }
                    }
                    else
                    {
                        assessments.push({
                            name: "Final Exam",
                            grade: 0,
                            weight: assessmentInfo.weight,
                            complete: false
                        });
                    }
                }
            }
    
            return {
                name: this.state.courseName,
                assessments,
                average: 0,
                newCourse: true
            };
        }
        
        return(
            <Button
                color = {colors.accentColor}
                title = "Finish"
                onPress = {() => {
                    this.props.newCourse(this.state.semester, createCourseObject())
                    this.props.navigation.goBack();
                }}
            />
        );
    }

    courseTitle_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <TextInput
                        autoCapitalize = 'characters'
                        maxLength = {6}
                        defaultValue = {this.state._courseType}
                        onChangeText = {(newText) => this.setState({_courseType: newText})}
                        onSubmitEditing = {() => this.nextTextInput.focus()}
                        placeholder = "i.e. COMP"
                        placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                        underlineColorAndroid = {colors.primaryTextColor}
                        returnKeyType = 'next'
                        style = {textStyle.regular(24)}
                    />
                    <Text style = {[textStyle.regular(14), {paddingLeft: 3.5}]}>
                        Course Type
                    </Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <TextInput
                        ref = {input => this.nextTextInput = input}
                        keyboardType = 'numeric'
                        maxLength = {6}
                        defaultValue = {this.state._courseCode}
                        onChangeText = {(newText) => this.setState({_courseCode: newText})}
                        placeholder = "i.e. 1405"
                        placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                        underlineColorAndroid = {colors.primaryTextColor}
                        returnKeyType = 'done'
                        style = {textStyle.regular(24)}
                    />
                    <Text style = {[textStyle.regular(14), {paddingLeft: 3.5}]}>
                        Course Code
                    </Text>
                </View>
                <View style = {containerStyle.rowBox}>
                    {this.renderForwardButton(() =>
                    {
                        if (this.state._courseType == "" || this.state._courseCode == "")
                        {
                            this.showAlert("Incomplete Course Code");   
                        }
                        else
                        {
                            this.setState(prevState =>
                            {
                                return(
                                {
                                    courseName: this.state._courseType.toUpperCase() + " " + this.state._courseCode,
                                    currentScene: prevState.currentScene + 1
                                });
                            });
                        }
                    })}
                </View>
            </View>
        );
    }

    assessmentTypes_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.regular(22, 'center')}>What kind of assessments are in your course?{'\n\n'}Select all that apply.</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <CheckList 
                        color = {colors.accentColor}
                        fontSize = {22}
                        labels = {this.state.assessmentTypes}
                        values = {this.state.selectedTypes}
                        onItemToggle = {(id) =>
                        {
                            var newArray = this.state.selectedTypes;
                            newArray[id] = !newArray[id];
                            this.setState({selectedTypes: newArray});
                        }}
                    />
                </View>
                <View style = {containerStyle.rowBox}>
                    {this.renderBackButton()}
                    {this.renderForwardButton(() =>
                    {
                        var selectedCheck = false;
                        for (i in this.state.selectedTypes)
                        {
                            if (this.state.selectedTypes[i])
                            {
                                selectedCheck = true;
                                break;
                            }
                        }
                        if (!selectedCheck)
                        {
                            this.showAlert("No Type Selection Made"); 
                        }
                        else
                        {   
                            this.setState(prevState =>
                            {
                                return({currentScene: prevState.currentScene + 1});
                            });
                        }
                    })}
                </View>
            </View>
        );
    }

    assessmentDetails_SCENE()
    {
        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.regular(22, 'center')}>Specify the quantity and total weight of each type of assessment below.{/*{'\n\n'}You can get more specific on the next page.*/}</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <AssessmentDetails
                        assessmentTypes = {this.state.assessmentTypes}
                        selectedTypes = {this.state.selectedTypes}
                        initialInfo = {this.state.assessmentDetails}
                        onInfoChange = {(newData) =>
                        {
                            this.setState({assessmentDetails: newData})
                        }}
                    />
                </View>
                <View style = {containerStyle.rowBox}>
                    {this.renderBackButton()}
                    {this.renderForwardButton(() =>
                    {
                        var percentageTotal = 0;
                        var {selectedTypes, assessmentTypes, assessmentDetails} = this.state;

                        for (i in assessmentTypes)
                        {
                            if (selectedTypes[i])
                            {
                                if (assessmentDetails[assessmentTypes[i]].weight == 0)
                                {
                                    this.showAlert("Weight of 0", assessmentTypes[i]);
                                    return;
                                }
                                else if (assessmentTypes[i] == "Final Exam")
                                {
                                    percentageTotal += assessmentDetails[assessmentTypes[i]].weight;
                                }
                                else
                                {
                                    percentageTotal += assessmentDetails[assessmentTypes[i]].weight * assessmentDetails[assessmentTypes[i]].quantity;
                                }   
                            }
                        }
                        
                        if (percentageTotal != 100)
                        {
                            this.showAlert("Weights don't add up");
                        }
                        else
                        {
                            this.setState(prevState =>
                            {
                                return({currentScene: prevState.currentScene + 1});
                            });
                        }
                    })}
                </View>
            </View>
        );
    }

    confirmCourse_SCENE()
    {
        var {assessmentDetails, assessmentTypes, selectedTypes} = this.state;
        var displayStyle = 
        {
            color: colors.primaryTextColor,
            fontSize: 18,
            fontFamily: 'Lato-Regular'
        };

        var assessmentDisplay = (assessmentType) =>
        {
            var name = assessmentType;
            var quantity = assessmentDetails[assessmentType].quantity + " ";
            var weight = assessmentDetails[assessmentType].weight;
            
            if (name == "Final Exam")
            {
                quantity = "";

                return(
                    <View 
                        key = {assessmentType}
                        style = {{paddingVertical: 5}}>
                        <Text style = {{color: colors.primaryTextColor, fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            {quantity + name + " - " + weight + "%"}
                        </Text>
                    </View>
                );
            }

            if (quantity == 1)
            {
                if (name == "Quizzes")
                {
                    name = "Quiz"
                }
                else
                {
                    name = name.slice(0, -1);
                }
            }

            return(
                <Text 
                    key = {assessmentType}
                    style = {displayStyle}
                >
                    {quantity + name + " - " + (quantity * weight) + "%"}
                </Text>
            );
        };

        var displayList = [];
        for (i in assessmentTypes)
        {
            if (selectedTypes[i])
            {
                displayList.push(assessmentDisplay(assessmentTypes[i]));
            }
        }

        return(
            <View style = {containerStyle.form}>
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.regular(22, 'center')}>Confirm your course information below.</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <View style = {[containerStyle.courseCard, {alignItems: 'center'}]}>
                        <Text style = {textStyle.bold(22)}>{this.state.courseName}</Text>
                        <View style = {{paddingVertical: 10}}>
                            <Text 
                                style = {{color: colors.primaryTextColor, fontSize: 18, fontFamily: 'Lato-Light'}}
                            >
                                Your Assessments
                            </Text>
                        </View>
                        {displayList}
                    </View>
                </View>
                <View style = {containerStyle.formSection}>
                    {this.renderFinishButton()}
                    <View style = {containerStyle.rowBox}>
                        <TouchableOpacity 
                            onPress = {() => this.setState(prevState =>
                            {
                                return({currentScene: prevState.currentScene - 1});
                            })}
                            style = {{paddingVertical: 15, paddingHorizontal: 70}}
                        >
                            <Text style = {{fontFamily: 'Lato-Regular', color: colors.accentColor}}>
                                Wait I need to change something!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render()
    {
        var scenes = [this.courseTitle_SCENE(), this.assessmentTypes_SCENE(), this.assessmentDetails_SCENE(), this.confirmCourse_SCENE()];
        
        var backButton = () =>
        {
            if (this.state._courseCode == "" && this.state._courseType == "")
            {
                this.props.navigation.goBack()   
            }
            else
            {
                this.showAlert("Cancel Creation");
            }
            
        }

        return(
            <View style = {containerStyle.page}>
                <ScrollView>
                    <ActionBar
                        inverted = {true}
                        leftButton = 
                        {
                            <IconButton
                                type = 'arrow-back'
                                size = {30}
                                color = {colors.primaryColor}
                                action = {backButton}
                            />
                        }
                        title = "Add Course"
                    />
                    {scenes[this.state.currentScene]}
                </ScrollView>
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
export default connect(mapStateToProps, {newCourse})(AddCoursePage);
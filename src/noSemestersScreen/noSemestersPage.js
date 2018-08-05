// React Native imports
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import {IconButton} from 'easyGrades/src/common';

class NoSemestersPage extends Component
{
    constructor(props)
    {
        super(props);

        var moveOnIfSemestersExist = () =>
        {
            var showNoSemestersPage = this.props.navigation.getParam('showNoSemesters', true);
            if (this.props.goStraightToSemester && !showNoSemestersPage)
            {
                this.props.navigation.navigate(this.props.latestSmester);
            }
        };

        this.props.navigation.addListener('didFocus', moveOnIfSemestersExist)
    }

    render()
    {
        return(
            <View style = {containerStyle.page}>
                <View style = {{
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    height: 56
                }}>
                    <IconButton
                        type = 'menu'
                        size = {30}
                        color = {colors.primaryColor}
                        action = {this.props.navigation.openDrawer}
                    />
                </View>
                <View style = {{flex: 1, justifyContent: 'center', padding: 50, paddingTop: -56}}>
                    <Text style = {textStyle.regular(16, 'center')}>
                        Get started by pressing that button right there.
                    </Text>
                    <View style = {{marginVertical: 20}}/>
                    <View style = {containerStyle.rowBox}>
                        <TouchableOpacity
                            style = {{alignItems: 'center', alignSelf: 'stretch', flex: 1, paddingVertical: 5}}
                            onPress = {() => this.props.navigation.navigate("Add Semester")}
                        >
                            <View style = {{
                                backgroundColor: colors.darkPrimaryColor,
                                paddingVertical: 15,
                                paddingHorizontal: 50,
                                borderRadius: 30
                            }}>
                                <Text 
                                    style = {[textStyle.bold(20), {color: 'white'}]}
                                >
                                    Start Semester
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) =>
{
    var semesterName = "";
    var semestersExist = false;

    for (i in state.semesters)
    {
        semestersExist = true;
        semesterName = state.semesters[i].name;
    }

    return {
        goStraightToSemester: semestersExist,
        latestSmester: semesterName
    };
}
export default connect(mapStateToProps)(NoSemestersPage);
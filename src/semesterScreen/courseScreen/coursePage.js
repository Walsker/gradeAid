// React Native imports
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';

// Custom imports
import {ActionBar, IconButton, ProgressCircle, Tile} from 'easyGrades/src/common';
import {colors, containerStyle} from 'easyGrades/src/common/appStyles';
import AssessmentList from './_components/assessmentList';

export default class CoursePage extends Component
{
    newAssessment()
    {
        alert("New Assessment");
    }
    editCourse()
    {
        alert("Edit Course");
    }

    render()
    {
        var course = this.props.navigation.getParam('course', {});

        return(
            <View style = {containerStyle.default}>
                <ActionBar
                    leftButton = 
                    {
                        <IconButton
                            type = 'arrow-back'
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {this.props.navigation.goBack}
                        />
                    }
                    title = {course.name}
                    rightButton = 
                    {
                        <IconButton
                            type = 'edit'
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {this.editCourse}
                        />
                    }
                />
                <ScrollView style = {containerStyle.tileList}>
                    <Tile title = "Average" 
                        content = 
                        {
                            <ProgressCircle
                                diameter = {275}
                                borderWidth = {15}
                                ringColor = {colors.accentColor}
                                emptyRingColor = {colors.darkPrimaryColor}
                                backgroundColor = {colors.spaceColor}
                                percentage = {course.average}
                                animationDelay = {0}
                            />
                        }
                    />
                    {/* <Tile
                        title = "Insights"
                        content = 
                        {
                            <Text style = {{paddingHorizontal: 10, fontSize: 16, fontFamily: 'Lato-Italic', color: colors.secondaryTextColor, textAlign: 'center'}}>
                                Here I'll include information to do with the goals that the user may have set, or other relevant calculated information.
                                {"\n"}~{"\n"}The above average isn't actually the calculated average, it's just a placeholder.
                            </Text>
                        }
                    /> */}
                    <Tile
                        title = "Overview"
                        button = 
                        {
                            <IconButton
                                type = 'add'
                                size = {25}
                                color = {colors.primaryTextColor}
                                action = {this.newAssessment}
                            />
                        }
                        content = 
                        {
                            <AssessmentList assessments = {course.assessments}/>
                        }
                    />
                    <View style = {{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}
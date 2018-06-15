// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import AssessmentList from 'easyGrades/src/common/assessmentList';
import ProgressCircle from 'easyGrades/src/common/progressCircle';
import ActionBar from 'easyGrades/src/common/actionBar';
import ActionButton from 'easyGrades/src/common/actionButton';
import Tile from 'easyGrades/src/common/tile';

export default class CoursePage extends Component
{
    render()
    {
        var course = this.props.navigation.getParam('course', {name: 'NULL 0000', average: 0, assessments: {}});

        return(
            <View style = {containerStyle.default}>
                <ActionBar
                    leftButton = 
                    {
                        <ActionButton
                            type = "arrow-back"
                            size = {30}
                            color = {colors.titleAndIconColor}
                            action = {this.props.navigation.goBack}
                        />
                    }
                    title = {course.name}
                    rightButton = 
                    {
                        <ActionButton
                            type = "more-vert"
                            size = {30}
                            color = {colors.titleAndIconColor}
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
// React Native imports
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

// Custom imports
import {ActionBar, IconButton, ProgressCircle, Tile} from 'easyGrades/src/common';
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import AssessmentList from './_components/assessmentList';

export default class CoursePage extends Component
{
    addGrade()
    {
        alert("Add Grade");
    }
    editCourse()
    {
        alert("Edit Course");
    }

    renderContent(course, semesterName)
    {
        if (course.newCourse == true)
        {
            return(
                <View style = {containerStyle.tileList}>
                    <Tile
                        title = "Empty Course"
                        content = 
                        {
                            <View>
                                <View style = {{marginVertical: 5}}/>
                                <Text style = {textStyle.regular(16, 'center')}>
                                    You haven't completed any assessments yet.
                                </Text>
                                <View style = {{marginVertical: 5}}/>
                                <View style = {containerStyle.rowBox}>
                                    <TouchableOpacity
                                        style = {{alignItems: 'center', alignSelf: 'stretch', flex: 1, paddingVertical: 5}}
                                        onPress = {() => this.props.navigation.navigate("InputGradePage", {course, semesterName})}
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
                                                Input Grade
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                </View>
            );
        }
        else
        {
            return(
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
                                active = {!course.newCourse}
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
                                action = {() => this.props.navigation.navigate("Input Grade")}
                            />
                        }
                
                        content = 
                        {
                            <AssessmentList assessments = {course.assessments}/>
                        }
                    />
                    <View style = {{height: 10}}/>
                </ScrollView>
            );
        }   
    }

    render()
    {
        var course = this.props.navigation.getParam('course', {});
        var semesterName = this.props.navigation.getParam('semesterName', "");

        return(
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
                {this.renderContent(course, semesterName)}
            </View>
        );
    }
}
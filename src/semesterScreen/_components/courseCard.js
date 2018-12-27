// React Native imports
import React, {Component} from 'react';
import {Animated, Platform, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom imports
import {colors, containerStyle, textStyle} from 'gradeAid/src/common/appStyles';
import {ProgressCircle} from 'gradeAid/src/common';

export class AddCourseCard extends Component
{
    constructor(props)
	{
		super(props);
		this.state =
		{
			pressValue: new Animated.Value(0),
			INACTIVE_VALUE: 0,
			ACTIVE_VALUE: 1,
			duration: 75
		};
	}

	onPressIn()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.ACTIVE_VALUE,
			duration: this.state.duration
		}).start();
	}

	onRelease()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.INACTIVE_VALUE,
			duration: this.state.duration,
			delay: 150
		}).start();
		this.props.action()
    }
    
    renderAndroid()
    {
        return (
            <TouchableNativeFeedback
				background = {TouchableNativeFeedback.Ripple(colors.lightPrimaryColor, false)}
				onPress = {this.props.action}
			>
				<View style = {containerStyle.roundedBox}>
					<View style = {{
						alignItems: 'center',
						alignSelf: 'center',
						justifyContent: 'center',
						backgroundColor: colors.primaryColor,
						borderRadius: 50
					}}>
						<Icon
							name = 'add'
							size = {79}
							color = {colors.accentColor}
						/>
					</View>
					<View style = {{flex: 1, paddingTop: 20}}>
                        <Text 
                            style = {[textStyle.bold(18, 'center', colors.primaryColor), {maxWidth: 100, textAlignVertical: 'center'}]}
                            numberOfLines = {2}
                        >
							ADD COURSE
						</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
        );
    }

    renderiOS()
    {
        return (
            <Animated.View style = {{transform: [{scale: 
				this.state.pressValue.interpolate({
					inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
					outputRange: [1, 0.9]
				})
			}]}}>
                <TouchableWithoutFeedback
                    onPressIn = {this.onPressIn.bind(this)}
                    onPressOut = {this.onRelease.bind(this)}
                >
                    <View style = {containerStyle.roundedBox}>
                        <View style = {{
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primaryColor,
                            borderRadius: 50
                        }}>
                            <Icon
                                name = 'add'
                                size = {79}
                                color = {colors.accentColor}
                            />
                        </View>
                        <View style = {{flex: 1, paddingTop: 20}}>
                            <Text 
                                style = {[textStyle.bold(18, 'center', colors.primaryColor), {maxWidth: 100, textAlignVertical: 'center'}]}
                                numberOfLines = {2}
                            >
                                ADD COURSE
                            </Text>
                        </View>
                    </View>
			    </TouchableWithoutFeedback>
            </Animated.View>
        );
    }

    render()
    {
        if (Platform.OS === 'ios')
            return this.renderiOS();
        else
            return this.renderAndroid();
    }
}

export class CourseCard extends Component
{
    constructor(props)
	{
		super(props);
		this.state =
		{
			pressValue: new Animated.Value(0),
			INACTIVE_VALUE: 0,
			ACTIVE_VALUE: 1,
			duration: 75
		};
    }

	onPressIn()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.ACTIVE_VALUE,
			duration: this.state.duration
		}).start();
	}

	onRelease()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.INACTIVE_VALUE,
			duration: this.state.duration,
			delay: 150
		}).start();
		this.props.action()
    }
    
    renderAndroid()
    {
        return (
			<TouchableNativeFeedback
				background = {TouchableNativeFeedback.Ripple(colors.lightPrimaryColor, false)}
				onPress = {this.props.action}
			>
				<View style = {containerStyle.roundedBox}>
					<ProgressCircle
						diameter = {100}
						borderWidth = {10}
						ringColor = {colors.accentColor}
						emptyRingColor = {colors.darkPrimaryColor}
						backgroundColor = {colors.spaceColor}
						percentage = {this.props.courseObject.average}
						active = {!(this.props.courseObject.average == -1)}
						animationDelay = {500 + (parseInt(this.props.animationID) * 750)}
					/>
					<View style = {{flex: 1, paddingTop: 20}}>
                        <Text 
                            style = {[textStyle.bold(18, 'center', colors.primaryColor), {maxWidth: 100, textAlignVertical: 'center'}]}
                            numberOfLines = {1}
                        >
							{this.props.courseObject.name}
						</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
    }

    renderiOS()
    {    
        return (
            <Animated.View style = {{transform: [{scale: 
				this.state.pressValue.interpolate({
					inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
					outputRange: [1, 0.9]
				})
			}]}}>
                <TouchableWithoutFeedback
                    onPressIn = {this.onPressIn.bind(this)}
                    onPressOut = {this.onRelease.bind(this)}
                >
                    <View style = {containerStyle.roundedBox}>
                        <ProgressCircle
                            diameter = {100}
                            borderWidth = {10}
                            ringColor = {colors.accentColor}
                            emptyRingColor = {colors.darkPrimaryColor}
                            backgroundColor = {colors.spaceColor}
                            percentage = {this.props.courseObject.average}
                            active = {!(this.props.courseObject.average == -1)}
                            animationDelay = {500 + (parseInt(this.props.animationID) * 750)}
                        />
                        <View style = {{flex: 1, paddingTop: 20}}>
                            <Text 
                                style = {[textStyle.bold(18, 'center', colors.primaryColor), {maxWidth: 100, textAlignVertical: 'center'}]}
                                numberOfLines = {1}
                            >
                                {this.props.courseObject.name}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
		);
    }

    render()
    {
        if (Platform.OS === 'ios')
            return this.renderiOS();
        else
            return this.renderAndroid();
    }
}
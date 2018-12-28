// React Native imports
import React, {Component} from 'react';
import {Platform, Text, TextInput, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

export default class FractionInput extends Component
{
	render()
	{
		borderStyle = Platform.OS === 'ios' ? containerStyle.roundedBox : {};
		
		return (
			<View>
				<View style = {borderStyle}>
					<View style = {{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
						<TextInput
							{...this.props}
							blurOnSubmit = {false}
							defaultValue = {this.props.defaultNumValue}
							keyboardType = 'numeric'
							onChangeText = {this.props.onNumChange}
							onSubmitEditing = {() => this.denomInput.focus()}
							placeholderTextColor = {this.props.color + '20'}
							returnKeyType = 'next'
							style = {[textStyle.regular(this.props.fontSize, 'center', this.props.color), {width: this.props.fontSize * 3}]}
							underlineColorAndroid = {this.props.color}
						/>
						<Text style = {textStyle.regular(this.props.fontSize * 0.9, 'center', this.props.color)}>/</Text>
						<TextInput
							{...this.props}
							defaultValue = {this.props.defaultDenomValue}
							keyboardType = 'numeric'
							onChangeText = {this.props.onDenomChange}
							onSubmitEditing = {this.props.onSubmitEditing}
							placeholderTextColor = {this.props.color + '20'}
							returnKeyType = {this.props.submitKeyType}
							style = {[textStyle.regular(this.props.fontSize, 'center', this.props.color), {width: this.props.fontSize * 3}]}
							underlineColorAndroid = {this.props.color}
						/>
					</View>
				</View>
				<Text style = {textStyle.regular(this.props.fontSize / 1.7, 'center', this.props.color)}>
					{this.props.label}
				</Text>
			</View>
		);
	}
}
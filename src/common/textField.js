// React Native imports
import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

export default class TextField extends Component
{
	renderField()
	{
		return (
			<View>
				<View>
					<TextInput
						ref = {input => this.props.setRef ? this.props.setRef(input) : {}}
						blurOnSubmit = {false}
						placeholderTextColor = {this.props.textColor + '20'}
						style = {textStyle.regular(this.props.fontSize, this.props.textAlign, this.props.textColor)}
						underlineColorAndroid = {this.props.textColor}
						{...this.props}
					/>
				</View>
				<Text style = {textStyle.regular(this.props.fontSize / 1.7, this.props.textAlign, this.props.textColor)}>
					{this.props.label}
				</Text>
			</View>
		);
	}

	renderText()
	{
		return (
			<View style =
			{{
				flex: 1,
				marginHorizontal: 12,
				marginTop: 14,
				marginBottom: 10,
				justifyContent: 'center'
			}}>
				<Text style = {textStyle.thick(24, 'left', this.props.textColor)}>
					{this.props.title}
				</Text>
			</View>
		);
	}

	render()
	{
		return this.renderField();
	}
}
// React Native imports
import React, {Component} from 'react';
import {Dimensions, Platform, Text, TextInput, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle} from 'gradeAid/src/common/appStyles';

export default class TextField extends Component
{
	render()
	{
		var numericFieldWidth = Dimensions.get('window').width / 3;

		var borderStyle;
		if (Platform.OS === 'ios')
			borderStyle = containerStyle.roundedBox;
		else
		{
			if (this.props.keyboardType == 'numeric')
			{
				switch (this.props.textAlign)
				{
					case 'left':
						borderStyle = {width: numericFieldWidth, alignSelf: 'flex-start'};
						break;
					case 'right':
						borderStyle = {width: numericFieldWidth, alignSelf: 'flex-end'};
						break;
					default:
						borderStyle = {width: numericFieldWidth, alignSelf: 'center'};
				}
			}
		}

		return (
			<View>
				<View style = {borderStyle}>
					<TextInput
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
}
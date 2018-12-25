// --------------------------------------------------------------------------------------
// A small view that can be colored to seperate content
// Props:
// 		color = <color>
// 		style = styles to override
// --------------------------------------------------------------------------------------

// React Native imports
import React, {Component} from 'react';
import {View} from 'react-native';

export default class Divider extends Component
{
    render()
    {
        return (
			<View style =
			{[
				{
					height: 1.2,
					marginVertical: this.props.space ? this.props.space : 25,
					marginHorizontal: 50,
					backgroundColor: this.props.color
				},
				this.props.style
			]}/>
		);
    }
}
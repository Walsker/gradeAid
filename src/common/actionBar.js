// React Native imports
import React, {Component} from 'react';
import {View} from 'react-native';

export default class ActionBar extends Component
{
	render()
	{
		return (
			<View style = 
			{{
				alignItems: 'center',
				flexDirection: 'row',
				backgroundColor: this.props.color,
				height: 56,
				overflow: 'visible'
			}}>
				<View>
					{this.props.leftButton}
				</View>
				<View style = 
				{{
					flex: 1,
					marginHorizontal: 12,
					marginTop: 7,
					marginBottom: 10,
					// paddingTop: 7,
					justifyContent: 'flex-end',
					overflow: 'visible'
				}}>
					{this.props.children}
				</View>
				<View>
					{this.props.rightButton}
				</View>
			</View>
		);
	}
}
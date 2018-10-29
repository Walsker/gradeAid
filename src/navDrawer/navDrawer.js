// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {selectSemester} from './redux/actions';

// Custom imports
import {containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import Divider from './divider';
import DrawerItem from './drawerItem';

class NavDrawer extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			activeType: 0,
			SEMESTER_PAGE: 0,
			ABOUT_PAGE: 1,
			SETTINGS_PAGE: 2
		};
	}

	createSemesterLink(semesterID)
	{
		var semesterObject = this.props.semesterList[semesterID];

		if (semesterObject)
		{
			return(
				<DrawerItem
					key = {semesterObject.name}
					title = {semesterObject.name}
					active = {(semesterID == this.props.selectedSemester) &&
						(this.state.activeType == this.state.SEMESTER_PAGE)}
					action = {() =>
					{
						this.setState({activeType: this.state.SEMESTER_PAGE});
						this.props.selectSemester(semesterID);
						this.props.navigation.closeDrawer();
						this.props.navigation.navigate("Semester");
					}}
				/>
			);
		}
		else
			return;
	}

	render()
	{
		var semesterIDs = Object.keys(this.props.semesterList);
		semesterIDs.sort((a, b) => {return this.props.semesterList[a].orderID - this.props.semesterList[b].orderID});
		var semesterPageLinks = semesterIDs.map(semesterID => this.createSemesterLink(semesterID));

		if (Object.keys(this.props.semesterList).length != 0)
		{
			semesterPageLinks.push(<Divider key = "Divider"/>);
		}

		return(
			<View style = {containerStyle.default}>
				<View style = {containerStyle.drawerHeader}>
					<View style = {{marginVertical: 18}}/>
				</View>
				<View style = {containerStyle.default}>
					<View style = {{marginVertical: 5}}/>
					{semesterPageLinks}
					<DrawerItem
						title = "New Semester"
						active = {false}
						action = {() =>
						{
							this.props.navigation.closeDrawer();
							this.props.navigation.navigate("NewSemesterPage");
						}}
					/>
					<Divider/>
					<DrawerItem
						title = "Settings"
						active = {this.state.activeType == this.state.SETTINGS_PAGE}
						action = {() =>
						{
							this.setState({activeType: this.state.SETTINGS_PAGE});
							this.props.navigation.navigate("Settings");
						}}
					/>
					<DrawerItem
						title = "About"
						active = {this.state.activeType == this.state.ABOUT_PAGE}
						action = {() =>
						{
							this.setState({activeType: this.state.ABOUT_PAGE});
							this.props.navigation.navigate("About");
						}}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state, regularProps) =>
{
	return {
		...regularProps,
		semesterList: state.semesterList,
		selectedSemester: state.selectedSemester
	};
}

export default connect(mapStateToProps, {selectSemester})(NavDrawer);
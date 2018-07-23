// React Native imports
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {newSemester} from 'easyGrades/src/appRedux/actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';

class NoSemestersPage extends Component
{
    render()
    {
        console.log(textStyle);
        return(
            <View style = {[containerStyle.page, {justifyContent: 'center'}]}>
                <View style = {{padding: 50}}>
                    <Text style = {textStyle.regular(16, 'center')}>
                        An encouraging message.
                    </Text>
                    <View style = {{marginVertical: 20}}/>
                    <View style = {containerStyle.rowBox}>
                        <Button 
                            title = "Start Semester"
                            color = {colors.accentColor}
                            onPress = {this.props.newSemester}
                        />
                    </View>
                </View>                
            </View>
        );
    }
}

export default connect(null, {newSemester})(NoSemestersPage);
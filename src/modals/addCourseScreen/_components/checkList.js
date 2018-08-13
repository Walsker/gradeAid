// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Custom imports
import {colors} from 'easyGrades/src/common/appStyles';

export default class CheckList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {value: false};
    }

    createItem(id)
    {
        return(
            <TouchableOpacity
                key = {id}
                style = {styles.listItem}
                onPress = {() => {
                    this.props.onItemToggle(id);
                }}
            >
                <View style = {styles.subItem}>
                    <CheckCircle 
                        size = {this.props.fontSize}
                        onColor = {this.props.color}
                        value = {this.props.values[id]}
                    />
                </View>
                <View style = {styles.subItem}>
                    <Text style = {{
                        fontSize: this.props.fontSize,
                        fontFamily: 'Lato-Regular',
                        color: colors.primaryTextColor
                    }}>
                        {this.props.labels[id]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render()
    {
        var listComponents = [];

        for (var i in this.props.labels)
        {
            listComponents.push(this.createItem(i));
        }

        return(
            <View style = {styles.list}>
                {listComponents}
            </View>
        );
    }
}

class CheckCircle extends Component
{
    render()
    {
        return(
            <View
                style = {{
                    width: this.props.size,
                    height: this.props.size,
                    borderRadius: this.props.size / 2,
                    borderWidth: 2,
                    borderColor: this.props.value ? this.props.onColor : 'rgba(0, 0, 0, 0.25)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View style = {{
                    width: this.props.size / 1.75,
                    height: this.props.size / 1.75,
                    borderRadius: this.props.size / 3.5,
                    backgroundColor: this.props.onColor,
                    opacity: this.props.value ? 1 : 0
                }}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    list:
    {
        padding: 25
    },
    listItem:
    {
        flexDirection: 'row',
        paddingBottom: 5
    },
    subItem:
    {
        margin: 5,
        justifyContent: 'center'
    }
});

// Example toggle function to be passed in onItemToggle in CheckList
// const itemToggle = (id) =>
// {
//     var newArray = this.state.checkList;
//     newArray[id] = !newArray[id];
//     this.setState({checkList: newArray});
// };
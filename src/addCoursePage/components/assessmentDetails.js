// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'easyGrades/src/common/appStyles';
import NumberPicker from './numberPicker';

export default class AssessmentDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {details: this.props.initialInfo};
    }

    renderAssessmentCard(type)
    {
        console.log(this.state.details, type);
        var quantityDisplay = () => 
        {
            return(
                <View style = {styles.item}>
                    <Text style = {styles.itemLabel}>Quantity</Text>
                    <NumberPicker
                        value = {this.state.details[type].quantity}
                        onIncrease = {() =>
                        {
                            var newDetails = this.state.details;
                            newDetails[type] =
                            {
                                quantity: newDetails[type].quantity + 1,
                                weight: newDetails[type].weight
                            };
                            this.setState({details: newDetails});
                            this.props.onInfoChange(this.state.details);
                        }}
                        onDecrease = {() =>
                        {
                            var newDetails = this.state.details;
                            var newQuantity = newDetails[type].quantity;

                            if (newQuantity > 1) { newQuantity--; }
                            newDetails[type] =
                            {
                                quantity: newQuantity,
                                weight: newDetails[type].weight
                            };
                            this.setState({details: newDetails});
                            this.props.onInfoChange(this.state.details);
                        }}  
                    />
                </View>
            );
        };  
            
        // There can only be one final exam; don't ask for quantity
        if (type == "Final Exam")
        {
            quantityDisplay = () => {return(<View/>);};
        }
        
        const convertToPercentage = (objectToConvert, fallback) =>
        {
            var attempt = parseFloat(objectToConvert);
            console.log(attempt, fallback)
            if (Number(attempt) === attempt)
            {
                if (attempt > 100)
                {
                    return 100;
                }
                else if (attempt < 0)
                    return 0;
                return attempt;
            }
            else
            {
                return fallback;
            }
        }

        var currentText = "";
        var significanceDisplay;

        if (type == "Final Exam")
        {
            significanceDisplay = <View/>
        }
        else
        {
            significanceDisplay = 
                <View style = {styles.item}>
                        <Text style = {{fontFamily: 'Lato-Regular', color: colors.secondaryTextColor}}>
                            Percentage of course: {this.state.details[type].quantity * this.state.details[type].weight}%
                        </Text>
                </View>
        }

        return(
            <View
                style = {[styles.card, containerStyle.card]}
                key = {type}
            >
                <Text style = {styles.cardTitle}>{type}</Text>
                {quantityDisplay()}
                <View style = {styles.item}>
                    <Text style = {styles.itemLabel}>Weight</Text>
                    <View style = {styles.item}>
                        <TextInput
                            keyboardType = 'numeric'
                            clearTextOnFocus = {true}
                            defaultValue = {this.state.details[type].weight.toString()}
                            placeholderTextColor = 'rgba(0, 0, 0, 0.2)'
                            underlineColorAndroid = {colors.primaryTextColor}
                            returnKeyType = 'done'
                            style = {[styles.numberText, {width: 75, textAlign: 'right'}]}
                            onChangeText = {(newText) => currentText = newText}
                            onEndEditing = {() =>
                            {
                                var newDetails = this.state.details;
                                var newWeight =  convertToPercentage(currentText, newDetails[type].weight);
                                newDetails[type] = 
                                {
                                    quantity: newDetails[type].quantity,
                                    weight: newWeight
                                }
                                console.log(newWeight);
                                this.setState({details: newDetails});
                                this.props.onInfoChange(this.state.details);
                            }}
                        />
                        <Text style = {styles.numberText}>%</Text>
                    </View>     
                </View>
                {significanceDisplay}
            </View>
        );
    }

    render()
    {
        var assessmentDetailsList = [];
        
        for (i in this.props.selectedTypes)
        {
            if (this.props.selectedTypes[i])
            {
                assessmentDetailsList.push(this.renderAssessmentCard(this.props.assessmentTypes[i]));
            }
        }

        return(
            <View style = {styles.detailsList}>
                {assessmentDetailsList}
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    card:
    {
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    cardTitle:
    {
        color: colors.primaryTextColor,
        fontSize: 22,
        fontFamily: 'Lato-Bold'
    },
    detailsList:
    {
        padding: 25
    },
    item:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLabel:
    {
        color: colors.primaryTextColor,
        fontSize: 16,
        fontFamily: 'Lato-Regular'
    },
    numberText:
    {
        color: colors.primaryTextColor,
        fontSize: 25,
        fontFamily: 'Lato-Regular'
    }
});
import {StyleSheet} from 'react-native';

export const colors = 
{
    spaceColor: 'rgb(250, 250, 250)',
    darkSpaceColor: 'rgb(200, 200, 200)',
    accentColor: '#FFC107',
    primaryColor: '#3F51B5',
    darkPrimaryColor: '#303F9F',
    lightPrimaryColor: '#C5CAE9',
    primaryTextColor: '#212121',
    secondaryTextColor: '#757575',
    dividerColor: '#BDBDBD',
    titleAndIconColor: '#FFFFFF'
}

export const containerStyle = StyleSheet.create(
{
    default:
    {
        flex: 1,
        backgroundColor: colors.spaceColor
    },
    actionBar:
    {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryColor,
        elevation: 3
    },
    assessmentCard:
    {
        alignSelf: 'stretch',
        backgroundColor: colors.lightPrimaryColor,
        borderColor: colors.primaryTextColor
    },
    assessmentCardTitle:
    {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    assessmentCardDisplay:
    {
        flexDirection: 'row',
    },
    assessmentGradeBar:
    {
        flex: 4.5,
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 15,
    },
    assessmentGradePercent:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 20
    },
    assessmentList:
    {
        // alignItems: 'center',
        alignSelf: 'stretch',
        marginVertical: 5
    },
    page: // This is essentially a list of tiles
    {
        flex: 1,
        backgroundColor: colors.darkSpaceColor,
        paddingVertical: 5
        // alignItems: 'center',
        // justifyContent: 'flex-start'
    },
    tile:
    {
        backgroundColor: colors.spaceColor,
        marginVertical: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        elevation: 3
    },
    tileTitle:
    {
        padding: 5,
    },
    tileContent:
    {
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
    }
});

export const textStyle = StyleSheet.create(
{
    default:
    {
        color: colors.primaryTextColor
    },
    actionBarTitle:
    {
        color: colors.titleAndIconColor,
        fontSize: 24,
        fontFamily: 'Lato-Bold'
    },
    assessmentTitle:
    {
        color: colors.primaryTextColor,
        fontSize: 20,
        fontFamily: 'Lato-Regular'
    },
    assessmentGrade:
    {
        color: colors.secondaryTextColor,
        fontSize: 22,
        fontFamily: 'Lato-Bold'
    },
    gpaDisplay:
    {
        color: colors.primaryTextColor,
        fontSize: 208,
        fontFamily: 'Lato-Black'
    },
    tileTitle:
    {
        color: colors.primaryTextColor,
        fontSize: 18,
        fontFamily: 'Lato-Regular'
    }
});
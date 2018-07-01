// React Navigation imports
import {createStackNavigator} from 'react-navigation';

// Redux imports
import * as actionTypes from './actionTypes';

// ---------------------------------------------------------------------------------------
// GENERATE ROUTE CONFIGS ACTION
// ---------------------------------------------------------------------------------------

// Custom imports
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';
import AddCoursePage from 'easyGrades/src/addCoursePage/addCoursePage';

const createSemesterPage = (semester) =>
{
    var routes = {};
    routes[semester.name] = {screen: SemesterPage}; // The actual page
    routes["Add Course"] = {screen: AddCoursePage}; // The page for adding a course to the semester

    // Creating pages for the individual courses
    for (i in semester.courses)
    {
        routes[semester.courses[i].name] = {screen: CoursePage};
    }

    // Returning a Stack Navigator
    return(createStackNavigator(routes, {headerMode: 'none'}));
}

export const generateRouteConfigs = (semesterList) =>
{
    var routes = {};

    // Creating a screen for each of the semesters
    for (i in semesterList)
    {
        routes[semesterList[i].name] = {screen: createSemesterPage(semesterList[i])};
    }
    
    return {
        type: actionTypes.GENERATE_ROUTE_CONFIGS,
        payload: routes
    };
}

// ---------------------------------------------------------------------------------------
// SET MAX GPA
// ---------------------------------------------------------------------------------------

export const setMaxGPA = (newGPA) =>
{
    return {
        type: actionTypes.SET_MAX_GPA,
        payload: newGPA
    };
}
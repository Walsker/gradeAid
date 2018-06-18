// React Navigation imports
import {createStackNavigator} from 'react-navigation';

// Redux imports
import {GENERATE_ROUTE_CONFIGS} from './_actionTypes';

// Custom imports
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';

const createSemesterPage = (semester) =>
{
    var routes = {};
    routes[semester.name] = {screen: SemesterPage}

    for (i in semester.courses)
    {
        routes[semester.courses[i].name] = {screen: CoursePage}
    }

    return(
        createStackNavigator(routes, {headerMode: 'none'})
    );
}

export const generateRouteConfigs = (semesterList) =>
{
    var routes = {};
    
    for (i in semesterList)
    {
        routes[semesterList[i].name] = {screen: createSemesterPage(semesterList[i])}
    }
    
    return {
        type: GENERATE_ROUTE_CONFIGS,
        payload: routes
    };
}
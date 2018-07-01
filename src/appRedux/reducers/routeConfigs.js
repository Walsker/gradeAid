import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';

const defaultConfigs = {};
defaultConfigs["Fall 1970"] = {screen: SemesterPage};

// ------------------------------------------------------------------

import {GENERATE_ROUTE_CONFIGS} from '../actionTypes';

export default (prevState = defaultConfigs, action) =>
{
    switch(action.type)
    {
        case GENERATE_ROUTE_CONFIGS:
            return action.payload;
        default:
            return prevState;
    }
}
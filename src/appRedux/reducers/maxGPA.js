import {SET_MAX_GPA} from '../actionTypes';

export default (prevState = 12, action) =>
{
    switch(action.type)
    {
        case SET_MAX_GPA:
            return action.payload;
        default:
            return prevState;
    }
}
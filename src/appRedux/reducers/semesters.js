import {NEW_COURSE, NEW_SEMESTER, LOAD_SEMESTER_LIST} from '../actionTypes';

export default (prevState = [], action) =>
{
    switch(action.type)
    {
        case LOAD_SEMESTER_LIST:
            return action.payload;

        case NEW_SEMESTER:
            var newList = prevState.slice();
            newList.push(action.payload);

            return newList;

        case NEW_COURSE:
            var newList = prevState.slice();
            for (i in newList)
            {
                if (action.payload.name == newList[i].name)
                {
                    newList[i] = action.payload;
                }
            }

            return newList;

        default:
            return prevState
    }
};
import {UP_COUNT} from '../actionTypes';

export default (prevState = 0, action) =>
{
	switch(action.type)
	{
		case UP_COUNT:
			return prevState + 1;
		default:
			return prevState;
	}
}
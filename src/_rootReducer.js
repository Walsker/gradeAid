import {combineReducers} from 'redux';
import navDrawer from './navDrawer/reducers';
import userData from './userData/reducers';

export default combineReducers({
	...navDrawer,
	...userData
});
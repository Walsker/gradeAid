import {combineReducers} from 'redux';
import appReducers from './appRedux/reducers';
import navDrawer from './navDrawer/redux/reducers';
import userData from './userData/reducers';

export default combineReducers({
	...appReducers,
	...navDrawer,
	...userData
});
import {combineReducers} from 'redux';
import appReducers from './appRedux/reducers';
import navReducers from './navDrawer/redux/reducers';
import userData from './userData/reducers';

export default combineReducers({
	...appReducers,
	...navReducers,
	...userData
});
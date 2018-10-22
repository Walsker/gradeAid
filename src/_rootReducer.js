import {combineReducers} from 'redux';
import appReducers from './appRedux/reducers';
import selectKeepers from './navDrawer/redux/reducers';
import userData from './userData/reducers';

export default combineReducers({
    ...appReducers,
    ...selectKeepers,
    ...userData
});
import {combineReducers} from 'redux';
import appReducers from './appRedux/reducers';
import userData from './userData/reducers';

export default combineReducers({
    ...appReducers,
    ...userData
});
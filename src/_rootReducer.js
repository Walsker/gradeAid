
// Redux imports
import {combineReducers} from 'redux';
import appReducers from './appRedux/reducers';

export default combineReducers({
    ...appReducers
});
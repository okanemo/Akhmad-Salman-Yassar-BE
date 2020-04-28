import { combineReducers } from 'redux'

import auth from './auth';
import users from './user';
import roles from './role';

export default combineReducers({
    auth,
    users,
    roles
})
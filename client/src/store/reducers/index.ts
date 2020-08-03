import { combineReducers } from 'redux';
import auth, { AuthState } from '~/store/reducers/auth';
import user, { UserState } from '~/store/reducers/user'; 
export interface RootState {
    auth: AuthState;
    user: UserState;
}

const rootReducer = combineReducers({
    auth,
    user,
});

export default rootReducer;
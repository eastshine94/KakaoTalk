import { combineReducers } from 'redux';
import auth, { AuthState } from '~/store/reducers/auth';

export interface RootState {
    auth: AuthState;
}

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;
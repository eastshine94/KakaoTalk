import { combineReducers } from 'redux';
import auth, { AuthState } from '~/store/reducers/auth';
import user, { UserState } from '~/store/reducers/user'; 
import profile, {ProfileState} from '~/store/reducers/profile';

export interface RootState {
    auth: AuthState;
    user: UserState;
    profile: ProfileState;
}

const rootReducer = combineReducers({
    auth,
    user,
    profile,
});

export default rootReducer;
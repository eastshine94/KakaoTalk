import { combineReducers } from 'redux';
import auth, { AuthState } from '~/store/reducers/auth';
import user, { UserState } from '~/store/reducers/user'; 
import profile, { ProfileState } from '~/store/reducers/profile';
import chat, { ChatState } from '~/store/reducers/chat';

export interface RootState {
    auth: AuthState;
    user: UserState;
    profile: ProfileState;
    chat: ChatState;
}

const rootReducer = combineReducers({
    auth,
    user,
    profile,
    chat,
});

export default rootReducer;
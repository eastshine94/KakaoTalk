import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { UserState } from '~/store/reducers/user';
import { UserActions } from '~/store/actions/user';
import { ProfileState } from '~/store/reducers/profile';
import { ProfileActions } from '~/store/actions/profile';
import {UserData} from '~/types/user';
import { ProfileContainer } from '~/containers';

interface Props{
    userState: UserState,
    profileState: ProfileState,
    userActions: typeof UserActions,
    profileActions: typeof ProfileActions,
}


class FriendsContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
        const token = window.sessionStorage.getItem("jwt");
        if(token){
            const parseToken: UserData = JSON.parse(token);
            props.userActions.fetchUser(parseToken);
        }
    }
    
    render() {
        const { userState } = this.props;
        const { showProfile } = this.props.profileActions;
        return(
            <React.Fragment>
                <ProfileContainer/>
                <Main>
                    <Header/>
                    <Content userData={userState} showProfile={showProfile}/>
                </Main>
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    profileState: state.profile,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
    profileActions: bindActionCreators(ProfileActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsContainer);
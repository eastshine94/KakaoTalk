import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { UserState } from '~/store/reducers/user';
import { UserActions } from '~/store/actions/user';
import {UserData} from '~/types/user';

interface Props{
    userState: UserState,
    userActions: typeof UserActions,
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
        const { userState } = this.props
        return(
            <Main>
                <Header/>
                <Content userData={userState}/>
            </Main>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsContainer);
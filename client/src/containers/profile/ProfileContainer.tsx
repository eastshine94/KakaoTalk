import React, { Component } from 'react';
import styled from 'styled-components';
import { UserProfile, Menu } from '~/components/profile';
import {connect} from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '~/store/reducers';
import { ProfileActions } from '~/store/actions/profile';
import { Modal } from '~/pages';


const Wrapper = styled.main`
    width: 360px;
    height: 580px;
    border: 1px solid #646464;
    margin: auto;
    color: #fff; 
    text-align: center;
`;
const BackgroundBase = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #848b91;
    z-index: -1;
    & img {
        width: 100%;
        height: 100%;
        opacity: 0.6;
    }
`;
const CancelIcon = styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #fff;
    z-index: 100;
    cursor: pointer;
`

interface Props {
    rootState: RootState;
    profileActions: typeof ProfileActions;
}

class ProfileContainer extends Component<Props> {
    render(){
        const profileState = this.props.rootState.profile;
        const userState = this.props.rootState.user;
        const isMe = profileState.id === userState.id;

        const { hideProfile, changeProfile } = this.props.profileActions;
        const setBackground = profileState.background_img_url ? <img src={profileState.background_img_url} alt="bg_image"/> : "";
        if(!profileState.isProfileShown) return null;
        return(
            <Modal onClose={hideProfile}>
                <Wrapper>
                    <BackgroundBase>
                        {setBackground}
                    </BackgroundBase>
                    <CancelIcon className="fas fa-times" onClick={hideProfile}/>
                    <UserProfile isMe={isMe} userData={ profileState } changeProfile={changeProfile}/>
                    <Menu isMe={isMe}/>
                </Wrapper>
            </Modal>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    profileActions: bindActionCreators(ProfileActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContainer);
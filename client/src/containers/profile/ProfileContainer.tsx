import React, { Component } from 'react';
import styled from 'styled-components';
import { UserProfile, Menu } from '~/components/profile';
import {connect} from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '~/store/reducers';
import { ProfileState } from '~/store/reducers/profile';
import { ProfileActions } from '~/store/actions/profile';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    min-height: 100vh;
`;
const Wrapper = styled.main`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
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
    profileState: ProfileState;
    profileActions: typeof ProfileActions;
}

class ProfileContainer extends Component<Props> {
    render(){
        const { profileState } = this.props;
        const { hideProfile } = this.props.profileActions;
        const setBackground = profileState.background_img_url ? <img src={profileState.background_img_url} alt="bg_image"/> : "";

        if(!profileState.isProfileShown) return "";
        return(
            <React.Fragment>
                <Overlay onClick={hideProfile}/>
                <Wrapper>
                    <BackgroundBase>
                        {setBackground}
                    </BackgroundBase>
                    <CancelIcon className="fas fa-times" onClick={hideProfile}/>
                    <UserProfile userData={ profileState }/>
                    <Menu/>
                </Wrapper>
            </React.Fragment>
           
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    profileState: state.profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    profileActions: bindActionCreators(ProfileActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContainer);
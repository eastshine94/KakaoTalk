import React,{ useState } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '~/store/reducers';
import { ProfileActions } from '~/store/actions/profile';
import { UserActions } from '~/store/actions/user';
import ProfileInputWindow from './ProfileInputWindow';
import { BgImageSetting, ProfileImageSetting, FriendProfileImage } from './SettingBlock';

const Wrapper = styled.section`
    width: 100%;
    height: 450px;
    padding-top: 300px;
`;
const ProfileText = styled.div`
    position: relative;
    & p {
        display: inline-block;
        max-width: 80%;
        padding-right: 5px;
        min-height: 19px;
        font-size: 13px;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        & b{
            font-size: 16px;
            font-weight: bold;
        }
    }
    & i {
        position: absolute;
        bottom: 10px;
        cursor: pointer;
    }
`;
const SettingOverlay = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 99;
`;

interface Props {
    rootState: RootState;
    profileActions: typeof ProfileActions;
    userActions: typeof UserActions;
}

const UserProfile: React.FC<Props> = ( props ) => {
    const { changeProfile, changeFriendName } = props.profileActions;
    const { fetchRoomList } = props.userActions;
    const loginUserData = props.rootState.user;
    const profileData = props.rootState.profile;
    const isMe =  loginUserData.id === profileData.id;
    const isFriend = !!loginUserData.friends_list.find(friend => friend.id === profileData.id);
    const [isShowBgSetting, showBgSetting] = useState(false);
    const [isShowProfileSetting, showProfileSetting] = useState(false);
    const [isShowNameChange, showNameChange] = useState(false);
    const [isShowStatusMsgChange, showStatusMsgChange] = useState(false);

    const onSettingBgClick = () => {
        showBgSetting(false);
        showProfileSetting(false);
    }
    const showSettinOverlay = isShowBgSetting || isShowProfileSetting ? <SettingOverlay onClick={onSettingBgClick}/>:""
    const showProfileInputWindow = () => {
        const user_profile_id = profileData.id;
        const changeName = async(name: string) => {
            name = name.trim();
            const isExistName = name.replace(/ /g,"");
            if(isExistName){
                if(isMe){
                    await changeProfile({id: user_profile_id, name});
                }
                else {
                    await changeFriendName({my_id: loginUserData.id, friend_id: user_profile_id, friend_name: name});
                }
                await fetchRoomList(loginUserData.id);
            }
        }
        const changeStatusMsg = async(msg:string) => {
            msg = msg.trim();
            await changeProfile({id:user_profile_id, status_msg: msg});
        }
        
        if(isShowNameChange){
            return <ProfileInputWindow currentValue={profileData.name || ""} maxLength={20} showWindow={showNameChange} changeProfile={changeName}/>
        }
        else if(isShowStatusMsgChange){
            return <ProfileInputWindow currentValue={profileData.status_msg || ""} maxLength={60} showWindow={showStatusMsgChange} changeProfile={changeStatusMsg}/>
        }
        return ""
    }
    return(
        <React.Fragment>
            {showSettinOverlay}
            {showProfileInputWindow()}
            <Wrapper>
                {isMe ? <BgImageSetting userData={profileData} changeProfile={changeProfile} isShowSetting={isShowBgSetting} showSetting={showBgSetting}/>:null}
                {isMe ? <ProfileImageSetting userData={profileData} changeProfile={changeProfile} isShowSetting={isShowProfileSetting} showSetting={showProfileSetting}/> : <FriendProfileImage userData={profileData}/>}
                   
                <ProfileText>
                    <p><b>{profileData.name}</b></p>
                    {isMe || isFriend ? <i className="fas fa-pen" onClick={() => showNameChange(true)}/> : null}
                </ProfileText>
                <ProfileText>
                    <p>{profileData.status_msg}</p>
                    {isMe? <i className="fas fa-pen" onClick={() => showStatusMsgChange(true)}/>:null}
                </ProfileText>
            </Wrapper>
        </React.Fragment>
    )
}


const mapStateToProps = (state: RootState) => ({
    rootState: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    profileActions: bindActionCreators(ProfileActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);

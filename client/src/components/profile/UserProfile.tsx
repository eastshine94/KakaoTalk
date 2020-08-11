import React,{ useState } from 'react';
import styled from 'styled-components';
import ProfileInputWindow from './ProfileInputWindow';
import { UserData } from '~/types/user';
import {ProfileChangeRequestDto} from '~/types/profile';
import { BgImageSetting, ProfileImageSetting } from './SettingBlock';

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
    userData: UserData;
    changeProfile(profileData: ProfileChangeRequestDto): void;
}

const UserProfile: React.FC<Props> = ({userData, changeProfile}) => {
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
        const id = userData.id as number;
        const changeName = async(name: string) => {
            if(name){
                await changeProfile({id, name});
            }
        }
        const changeStatusMsg = async(msg:string) => {
            await changeProfile({id, status_msg: msg});
        }
        
        if(isShowNameChange){
            return <ProfileInputWindow currentValue={userData.name || ""} maxLength={20} showWindow={showNameChange} changeProfile={changeName}/>
        }
        else if(isShowStatusMsgChange){
            return <ProfileInputWindow currentValue={userData.status_msg || ""} maxLength={60} showWindow={showStatusMsgChange} changeProfile={changeStatusMsg}/>
        }
        return ""
    }
    return(
        <React.Fragment>
            {showSettinOverlay}
            {showProfileInputWindow()}
            <Wrapper>
                <BgImageSetting userData={userData} changeProfile={changeProfile} isShowSetting={isShowBgSetting} showSetting={showBgSetting}/>
                <ProfileImageSetting userData={userData} changeProfile={changeProfile} isShowSetting={isShowProfileSetting} showSetting={showProfileSetting}/>
                   
                <ProfileText>
                    <p><b>{userData.name}</b></p>
                    <i className="fas fa-pen" onClick={() => showNameChange(true)}/>
                </ProfileText>
                <ProfileText>
                    <p>{userData.status_msg}</p>
                    <i className="fas fa-pen" onClick={() => showStatusMsgChange(true)}/>
                </ProfileText>
            </Wrapper>
        </React.Fragment>
    )
}

export default UserProfile;

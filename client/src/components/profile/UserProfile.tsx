import React,{ useState } from 'react';
import styled from 'styled-components';
import ProfileInputWindow from './ProfileInputWindow';
import { UserData } from '~/types/user';
import {ProfileChangeRequestDto} from '~/types/profile';


const Wrapper = styled.section`
    width: 100%;
    height: 450px;
    padding-top: 300px;
`;

const BackgroundSetting = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    & i {
        font-size: 15px;
        color: #fff;
        cursor: pointer;
    }
`;
const SettingBlock = styled.div`
    position: absolute;
    width: 130px;
    border: 1px solid #646464;
    background: #fff;
    text-align: start;
    z-index: 100;
    &.bgSetting {
        top: 20px;
    }
    &.profileSetting {
        top: 90px;
        left: 50px;
    }
    & p {
        color: #000;
        font-size: 12px;
        min-height: 19px;
        padding: 7px 5px;
        cursor: pointer;
        &:hover{
            background: #f0f0f0;
        }
    }
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
const ProfileImage = styled.div`
    position: relative;
    display: inline-block;
    margin: auto;
    margin-bottom: 10px;
    & img{
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 35px;
        cursor: pointer;
    }   
`;
const SettingBg = styled.div`
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

    const bgSetting = isShowBgSetting? (
        <SettingBlock className="bgSetting">
            <p>배경 변경</p>
            <p>기본 이미지로 변경</p>
        </SettingBlock>
    ) : "";
    const profileSetting = isShowProfileSetting? (
        <SettingBlock className="profileSetting">
            <p>사진 변경</p>
            <p>기본 이미지로 변경</p>
        </SettingBlock>
    ): "";

    const onSettingBgClick = () => {
        showBgSetting(false);
        showProfileSetting(false);
    }
    const showSettinBg = isShowBgSetting || isShowProfileSetting ? <SettingBg onClick={onSettingBgClick}/>:""
    const showProfileInputWindow = () => {
        const id = userData.id as number;
        
        const changeName = async(name: string) => {
            await changeProfile({id, name});
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
            {showSettinBg}
            {showProfileInputWindow()}
            <Wrapper>
                <BackgroundSetting onClick={() => showBgSetting(!isShowBgSetting)}>
                    <i className="fas fa-image"/>
                    {bgSetting}
                </BackgroundSetting>
                <ProfileImage onClick={() => showProfileSetting(!isShowProfileSetting)}>
                    <img 
                        src={userData.profile_img_url || "/asset/base_profile.jpg"} 
                        alt="profile_image"
                    />
                    {profileSetting}
                </ProfileImage>
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

import React,{ useState } from 'react';
import styled from 'styled-components';
import { UserData } from '~/types/user';

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
    z-index: 1;
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
`;
interface Props {
    userData: UserData;
}

const UserProfile: React.FC<Props> = ({userData}) => {
    const [isShowBgSetting, showBgSetting] = useState(false);
    const [isShowProfileSetting, showProfileSetting] = useState(false);
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
    const onBgClick = () => {
        showBgSetting(false);
        showProfileSetting(false);
    }
    const onBgSettingClick = () => {
        showBgSetting(!isShowBgSetting);
        showProfileSetting(false);
    }
    const onProfileSettingClick = () => {
        showBgSetting(false);
        showProfileSetting(!isShowProfileSetting);
    }
    const showSettinBg = isShowBgSetting || isShowProfileSetting?<SettingBg onClick={onBgClick}/>:""
    
    return(
        <React.Fragment>
            {showSettinBg}
            <Wrapper>
                <BackgroundSetting onClick={onBgSettingClick}>
                    <i className="fas fa-image"/>
                    {bgSetting}
                </BackgroundSetting>
                <ProfileImage onClick={onProfileSettingClick}>
                    <img 
                        src={userData.profile_img_url? userData.profile_img_url:"/asset/base_profile.jpg"} 
                        alt="profile_image"
                    />
                    {profileSetting}
                </ProfileImage>
                <ProfileText>
                    <p><b>{userData.name}</b></p>
                    <i className="fas fa-pen"/>
                </ProfileText>
                <ProfileText>
                    <p>{userData.status_msg}</p>
                    <i className="fas fa-pen"/>
                </ProfileText>
            </Wrapper>

        </React.Fragment>
    )
}

export default UserProfile;

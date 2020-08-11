import React from 'react';
import styled from 'styled-components';

const BgImageSettingWrapper = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    & i {
        font-size: 15px;
        color: #fff;
        cursor: pointer;
    }
`;
const ProfileImageSettingWrapper = styled.div`
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


interface SettingProps {
    isShowSetting: boolean;
    showSetting(isShowSettign: boolean): void;
}

interface SettingBlockProps {
    className: string;
}

export const BgImageSetting: React.FC<SettingProps> = ({isShowSetting, showSetting}) => {
    const settingBlock = isShowSetting? <Setting className="bgSetting"/> : ""; 
    return(
        <BgImageSettingWrapper onClick={() => showSetting(!isShowSetting)}>
            <i className="fas fa-image"/>
            {settingBlock}
        </BgImageSettingWrapper>
    )
}

export const ProfileImageSetting: React.FC<SettingProps> = ({isShowSetting, showSetting, children}) => {
    const settingBlock = isShowSetting? <Setting className="profileSetting"/> : ""; 
    return(
        <ProfileImageSettingWrapper onClick={() => showSetting(!isShowSetting)}>
            {children}
            {settingBlock}
        </ProfileImageSettingWrapper>
    )
}

const Setting: React.FC<SettingBlockProps> = ({className}) => {
    const settingName = className === "bgSetting" ? "배경 변경" : "사진 변경";
    return(
        <SettingBlock className={className}>
            <label>
                <p>{settingName}</p>
                <input type="file" style={{display: "none"}} accept=".bmp, .png, .jpg, .jpeg"/>
            </label>
            <p>기본 이미지로 변경</p>
        </SettingBlock>
    )
}
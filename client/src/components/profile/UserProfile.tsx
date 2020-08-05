import React from 'react';
import styled from 'styled-components';
import { UserData } from '~/types/user';
const Wrapper = styled.section`
    width: 100%;
    height: 450px;
    padding-top: 300px;
`;

const ProfileImage = styled.img`
    display: block;
    margin: auto;
    margin-bottom: 10px;
    width: 90px;
    height: 90px;
    border-radius: 35px;
`;

interface Props {
    userData: UserData;
}


const UserProfile: React.FC<Props> = ({userData}) => {
    return(
        <Wrapper>
            <ProfileImage src={userData.profile_img_url? userData.profile_img_url:"/asset/base_profile.jpg"} alt="profile_image"/>
            <p><b>{userData.name}</b></p>
            <p>{userData.status_msg}</p>
        </Wrapper>
    )
}

export default UserProfile;

import React from 'react';
import styled from 'styled-components';
import { ProfileContainer } from '~/containers';
const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    min-height: 100vh;
    padding: 40px 0;
`;

const Profile: React.FC = () => {
    return(
        <Wrapper>
            <ProfileContainer/>
        </Wrapper>
    )
}

export default Profile;
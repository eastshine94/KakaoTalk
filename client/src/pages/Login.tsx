import React from 'react';
import styled from 'styled-components';
import { LoginContainer } from '~/containers';
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f5f6f7;
    padding: 60px 0;
`;

const Login: React.FC = () => {
    return(
        <Wrapper>
            <LoginContainer/>
        </Wrapper>
    )
}

export default Login;
import React from 'react';
import styled from 'styled-components';
import {SignupContainer} from '~/containers';

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f5f6f7;
`;


const Signup: React.FC = () => {
    return(
        <Wrapper>
            <SignupContainer/>
        </Wrapper>
    )
}

export default Signup;
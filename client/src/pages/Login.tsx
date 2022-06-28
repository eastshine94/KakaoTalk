import React from 'react';
import styled from 'styled-components';
import { LoginContainer } from '~/containers';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f6f7;
  padding: 25px 0;
`;

const Login: React.FC = () => {
  return (
    <Wrapper>
      <LoginContainer />
    </Wrapper>
  );
};

export default Login;

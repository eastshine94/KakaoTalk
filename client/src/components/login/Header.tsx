import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
  height: 200px;
  padding-top: 100px;
  & img {
    display: block;
    margin: 0 auto;
  }
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <img src="/asset/kakao_logo.png" alt="logo" />
    </Wrapper>
  );
};

export default Header;

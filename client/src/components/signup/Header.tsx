import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '~/constants';

const Wrapper = styled.header`
  width: 100%;
  height: 100px;
  & h2 {
    text-align: center;
  }
`;

const LogoLink = styled(Link)`
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 8px;
  color: #ffeb33;
  text-shadow: -1px 0 #dcdcdc, 0 1px #dcdcdc, 1px 0 #dcdcdc, 0 -1px #dcdcdc;
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <h2>
        <LogoLink to={PAGE_PATHS.LOGIN}>kakao</LogoLink>
      </h2>
    </Wrapper>
  );
};

export default Header;

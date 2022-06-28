import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_PATHS } from '../../constants';

const Wrapper = styled.header`
  & ul {
    display: flex;
    justify-content: center;
    & li {
      color: #5a5a5a;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Footer;

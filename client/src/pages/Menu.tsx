import React from 'react';
import styled from 'styled-components';
import { MenuContainer } from '~/containers';

const Wrapper = styled.div`
  width: 100%;
`;

const Menu: React.FC = () => {
  return (
    <Wrapper>
      <MenuContainer />
    </Wrapper>
  );
};

export default Menu;

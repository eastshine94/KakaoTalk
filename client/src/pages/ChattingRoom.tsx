import React from 'react';
import styled from 'styled-components';
import { ChattingRoomContainer } from '~/containers';

const Wrapper = styled.div`
  width: 100%;
`;

const ChattingRoom: React.FC = () => {
  return (
    <Wrapper>
      <ChattingRoomContainer />
    </Wrapper>
  );
};

export default ChattingRoom;

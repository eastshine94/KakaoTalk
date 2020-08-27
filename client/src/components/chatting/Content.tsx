import React from 'react';
import {  MainContent } from '~/styles/BaseStyle';
import styled from 'styled-components'

const Wrapper = styled(MainContent)`
    & .preview {
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
`;

interface Props {
    intoRoom(): void;
}

const Content: React.FC<Props> = (props) => {
    const {intoRoom} = props;
    
    const onDoubleClick = () => {
        console.log("더블 클릭");
        intoRoom();
    }
    return(
        <Wrapper>
            <ul>
                <li onDoubleClick={onDoubleClick}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                    <p><b>방 이름</b></p>
                    <p className="preview">대화 내용</p>
                </li>
            </ul>
        </Wrapper>
    )
}

export default Content;
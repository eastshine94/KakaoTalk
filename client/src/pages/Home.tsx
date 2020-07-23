import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
    width: 100%;
    display: flex;
`;
const HomeSide = styled.aside`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100px;
    min-height: 500px;
    border: 1px solid red;
`;
const HomeMain = styled.section`
    margin-left: 100px;
    width: 100%;
    border: 1px solid red;
`
const HomeMainHeader = styled.section`
    position: fixed;
    width: 100%;
    height: 100px;
    border: 1px solid blue;
`;

const HomeMainContent = styled.section`
    margin-top: 100px;
    width: 100%;
    height: 800px;
    border: 3px solid green;
`;
class Home extends Component {
    render() {
        return (
            <Wrapper>
                <HomeSide>
                    <ul>
                        <li>친구</li>
                        <li>대화</li>
                    </ul>
                </HomeSide>
                <HomeMain>
                    <HomeMainHeader>
                    </HomeMainHeader>
                    <HomeMainContent>
                        <ul>
                            <li>안녕1</li>
                            <li>안녕2</li>
                            <li>안녕3</li>
                            <li>안녕4</li>
                            <li>안녕5</li>
                            <li>안녕6</li>
                            <li>안녕7</li>
                            <li>안녕8</li>
                            <li>안녕9</li>
                            <li>안녕10</li>
                            <li>안녕11</li>
                            <li>안녕12</li>
                            <li>안녕13</li>
                            <li>안녕14</li>
                            <li>안녕15</li>
                            <li>안녕16</li>
                            <li>안녕17</li>
                        </ul>
                    </HomeMainContent>
                </HomeMain>
            </Wrapper>
        );
    }
}

export default Home;
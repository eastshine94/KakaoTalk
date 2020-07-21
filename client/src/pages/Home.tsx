import React, { Component } from 'react';
import styled,{createGlobalStyle} from 'styled-components';

const Wrapper = styled.div`
    color: red;
`;
const GlobalStyle = createGlobalStyle`
    body {
        background: #fff;
        color: white;
    }
`;

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <GlobalStyle/>
                <Wrapper>hello world!</Wrapper>
            </React.Fragment>
        );
    }
}

export default Home;
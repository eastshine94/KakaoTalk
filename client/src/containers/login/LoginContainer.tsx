import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Content, Footer } from '~/components/login'

const Wrapper = styled.div`
    position: absolute;
    width: 360px;
    height: 600px;
    background-color: #ffeb33;
    top: 50%;
    left: 50%; 
    transform:translateX(-50%) translateY(-50%);
`

class LoginContainer extends Component {
    render() {
        return(
            <Wrapper>
                <Header/>
                <Content/>
                <Footer/>
            </Wrapper>
        )
    }
}

export default LoginContainer;
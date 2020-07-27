import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Content, Footer } from '~/components/login'

const Wrapper = styled.div`
    width: 360px;
    height: 600px;
    background-color: #ffeb33;
    margin: auto;
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
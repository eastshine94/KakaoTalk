import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Content } from '~/components/signup'

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 50px 0;
    width: 50%;
    height: 100vh;
    border: 1px solid #dadada;
    @media only screen and (max-width: 640px){
        width: 100%;
    }
    @media only screen and (max-width: 360px){
        width: 360px;
    }
`

class SignupContainer extends Component {
    render() {
        return(
            <Wrapper>
                <Header/>
                <Content/>
            </Wrapper>
        )
    }
}

export default SignupContainer;
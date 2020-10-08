import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Content } from '~/components/signup'
import { RootState } from '~/store/reducers';
import { AuthState }  from '~/store/reducers/auth';
import { PAGE_PATHS } from '~/constants';

const Wrapper = styled.div`
    margin: 0 auto;
    width: 50%;
    min-height: 95vh;
    border: 1px solid #dadada;
    @media only screen and (max-width: 800px){
        width: 95%;
    }
`

interface Props {
    authState: AuthState;
}

class SignupContainer extends Component<Props> {
    render() {
        const { token } = this.props.authState;
        if(token) return <Redirect to={PAGE_PATHS.FRIENDS}/>

        return(
            <Wrapper>
                <Header/>
                <Content/>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    authState: state.auth,
});

const mapDispatchToProps = () => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupContainer);
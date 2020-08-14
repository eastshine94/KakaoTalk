import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Content, Footer } from '~/components/login'
import { AuthActions } from '~/store/actions/auth';
import { RootState } from '~/store/reducers';
import { AuthState } from '~/store/reducers/auth';
import { PAGE_PATHS } from '~/constants';

const Wrapper = styled.div`
    width: 360px;
    height: 600px;
    background-color: #ffeb33;
    margin: auto;
`
interface Props {
    authActions: typeof AuthActions;
    authState: AuthState;
}

class LoginContainer extends Component<Props> {
    
    componentWillUnmount() {
        this.props.authActions.resetMessage();
    }

    render() {
        const { login } = this.props.authActions;
        const { token, loginFailuerMsg } = this.props.authState;

        if(token) return <Redirect to={PAGE_PATHS.FRIENDS}/>
        return(
            <Wrapper>
                <Header/>
                <Content login={login} loginFailuerMsg={loginFailuerMsg}/>
                <Footer/>
            </Wrapper>
        )
    }
}
const mapStateToProps = (state: RootState) => ({
    authState: state.auth,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    authActions: bindActionCreators(AuthActions, dispatch),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
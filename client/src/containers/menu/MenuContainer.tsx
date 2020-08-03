import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators} from 'redux';
import { MenuRoute } from '~/routes';
import { MenuSideBar } from '~/components/menu';
import { AuthActions } from '~/store/actions/auth';
import { RootState } from '~/store/reducers';
import { AuthState } from '~/store/reducers/auth'
import { PAGE_PATHS } from '~/constants';

const Wrapper = styled.main`
    width: 100%;
    display: flex;
`;

interface Props {
    authState: AuthState;
    authActions: typeof AuthActions;
}
class MenuContainer extends Component<Props> {
    render() {
        const { logout } = this.props.authActions;
        const { token } = this.props.authState;
        
        if(!token) {
            return <Redirect to={PAGE_PATHS.LOGIN}/>
        }

        return (
            <Wrapper>
                <MenuSideBar logout={logout}/>
                <MenuRoute/>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    authState: state.auth,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    authActions: bindActionCreators(AuthActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuContainer);
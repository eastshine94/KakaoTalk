import React, { Component } from 'react';
import styled from 'styled-components';
import { MenuRoute } from '~/routes';
import { MenuSideBar } from '~/components/menu';

const Wrapper = styled.main`
    width: 100%;
    display: flex;
`;
class Menu extends Component {
    render() {
        return (
            <Wrapper>
                <MenuSideBar/>
                <MenuRoute/>
            </Wrapper>
        );
    }
}

export default Menu;
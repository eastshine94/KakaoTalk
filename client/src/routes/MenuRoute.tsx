import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { PAGE_PATHS } from '~/constants';
import {FriendsContainer } from '~/containers'

const MenuRoute:React.SFC = () => {
    return(
        <Switch>
            <Route exact path={`${PAGE_PATHS.MENU}/friends`} component={FriendsContainer}/>
            <Route exact path={`${PAGE_PATHS.MENU}/chatting`}/>
        </Switch>
    )
}

export default MenuRoute;
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PAGE_PATHS } from '~/constants';
import {FriendsContainer } from '~/containers'

const MenuRoute:React.SFC = () => {
    return(
        <Switch>
            <Route path={`${PAGE_PATHS.MENU}/friends`} component={FriendsContainer}/>
            <Route path={`${PAGE_PATHS.MENU}/chatting`}/>
            <Route path={PAGE_PATHS.MENU} component={() => <Redirect to={`${PAGE_PATHS.MENU}/friends`}/>}/>
        </Switch>
    )
}

export default MenuRoute;
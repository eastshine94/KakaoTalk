import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PAGE_PATHS } from '~/constants';
import {FriendsContainer, ChattingContainer } from '~/containers'

const MenuRoute:React.SFC = () => {
    return(
        <Switch>
            <Route path={PAGE_PATHS.FRIENDS} component={FriendsContainer}/>
            <Route path={PAGE_PATHS.CHATTING} component={ChattingContainer}/>
            <Route path={PAGE_PATHS.MENU} component={() => <Redirect to={PAGE_PATHS.FRIENDS}/>}/>
        </Switch>
    )
}

export default MenuRoute;
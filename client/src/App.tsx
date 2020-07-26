import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { Menu, Login } from '~/pages';
import { PAGE_PATHS } from '~/constants';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={PAGE_PATHS.LOGIN} component = {Login}/>
                    <Route path={PAGE_PATHS.MENU} component={Menu}/>
                    <Route path={PAGE_PATHS.HOME} component={() => <Redirect to={PAGE_PATHS.LOGIN}/>}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
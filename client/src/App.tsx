import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { Menu } from '~/pages';
import { PAGE_PATHS } from '~/constants';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={PAGE_PATHS.MENU} component={Menu}/>
                    <Route path={PAGE_PATHS.HOME} component={() => <Redirect to={PAGE_PATHS.MENU}/>}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
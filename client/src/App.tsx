import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import {Home} from '~/pages';
import { PAGE_PATH } from '~/constants';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={PAGE_PATH.HOME} component={Home}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
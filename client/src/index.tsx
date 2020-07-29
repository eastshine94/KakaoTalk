import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import App from "./App";
import GlobalStyle from '~/styles/GlobalStyle';
import store from '~/store';
ReactDOM.render(
    <React.Fragment>
        <GlobalStyle/>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Fragment>   
,document.querySelector("#root"));
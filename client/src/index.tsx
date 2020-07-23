import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from '~/styles/GlobalStyle';

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle/>
        <App />
    </React.Fragment>   
,document.querySelector("#root"));
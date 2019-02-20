import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Loadable from 'react-loadable';

import Layout from "./components/Layout";

const jsx = (
    <Router>
        <Layout />
    </Router>
);

const app = document.getElementById( "app" );
Loadable.preloadReady().then(() => {
  ReactDOM.hydrate( jsx, app );
});

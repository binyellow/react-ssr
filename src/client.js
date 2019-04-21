import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';

import Layout from "./components/Layout";
import { createClientStore } from "./reducer/index";

const store = createClientStore( window.REDUX_DATA );
const jsx = (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
);

const app = document.getElementById( "app" );
Loadable.preloadReady().then(() => {
  ReactDOM.hydrate( jsx, app );
});

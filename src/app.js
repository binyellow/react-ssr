import express from 'express';
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { fetchUserMsg } from './services/user';
import { createServerStore } from './reducer/index';
import { initializeUserMsg } from './reducer/login';
import Layout from './components/Layout';
import stats from '../build/react-loadable.json';

const app = express();
app.use( express.static( path.join( __dirname, "./" ) ) );
app.get( "/*", async ( req, res ) => {
  try {
    // let modules = [];
    const context = {};
    const store = createServerStore();
    const { dispatch } = store;
    const result = await fetchUserMsg('binyellow');
    dispatch(initializeUserMsg(result.data));
    console.log(req.url);
    const jsx = (
      <Provider store={store}>
        <StaticRouter context={ context } location={ req.url }>
            <Layout />
        </StaticRouter>
      </Provider>
    );
    const reactDom = renderToStaticMarkup( jsx );
    // let bundles = getBundles(stats, modules);
    const state = store.getState();
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactDom, state ) );
  } catch (error) {
    throw error;
  }
});

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
});

function htmlTemplate( reactDom, state ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="icon" href="data:;base64,=">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script>
            window.REDUX_DATA = ${ JSON.stringify( state ) }
            window.env = 'server'
          </script>
          <script src="./index.js"></script>
      </body>
      </html>
  `;
}

import express from 'express';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import Layout from './components/Layout';
import stats from '../build/react-loadable.json';

const app = express();
app.use( express.static( path.resolve( __dirname, "../build" ) ) );
app.get( "/*", ( req, res ) => {
  let modules = [];
  const context = { };
  const jsx = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter context={ context } location={ req.url }>
          <Layout />
      </StaticRouter>
    </Loadable.Capture>
  );
  const reactDom = renderToString( jsx );
  let bundles = getBundles(stats, modules);
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( htmlTemplate( reactDom, bundles ) );
} );

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
});

function htmlTemplate( reactDom, bundles ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script src="./index.js"></script>
          ${bundles.map(bundle => {
            return `<script src="/dist/${bundle.file}"></script>`
            // alternatively if you are using publicPath option in webpack config
            // you can use the publicPath value from bundle, e.g:
            // return `<script src="${bundle.publicPath}"></script>`
          }).join('\n')}
          <script src="/dist/main.js"></script>
      </body>
      </html>
  `;
}

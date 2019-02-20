import express from 'express';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from 'react';
import Layout from './components/Layout';
import path from 'path';

const app = express();

app.use( express.static( path.resolve( __dirname, "../build" ) ) );
app.get( "/*", ( req, res ) => {
  const context = { };
  const jsx = (
      <StaticRouter context={ context } location={ req.url }>
          <Layout />
      </StaticRouter>
  );
  const reactDom = renderToString( jsx );
  console.log(req.url);
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( htmlTemplate( reactDom ) );
} );

app.listen(3000, () => {
  console.log('Running on http://localhost:3000/');
});

function htmlTemplate( reactDom ) {
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
      </body>
      </html>
  `;
}

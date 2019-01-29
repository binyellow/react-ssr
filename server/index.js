const Koa = require('koa');
const Router = require('koa-router');
const SSR = require('./app');

SSR.preloadAll();
const s = new SSR();
const app = new Koa();
const router = new Router();
router.get('*', async (ctx) => {
  //根据路由，渲染不同的页面组件
  const rendered = s.render(ctx.url);
  ctx.body = `
     <!DOCTYPE html>
       <html lang="en">
       <head>
         <meta charset="UTF-8">
         <title>React SSR</title>
       </head>
       <body>
         <div id="app">${rendered.html}</div>
         ${rendered.scripts.join()}
         <script type="text/javascript" src="/build/index.js"></script>
       </body>
     </html>
   `;
});
app.use(router.routes());
app.listen(3000, ()=>console.log('listen on 3000'));

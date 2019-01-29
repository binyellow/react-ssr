import React from 'react';
//使用静态 static router
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
//下面这个是需要让react-loadable在服务端可运行需要的，下面会讲到
import { getBundles } from 'react-loadable/webpack';
// import stats from '../build/react-loadable.json';

//这里吧react-router的路由设置抽出去，使得在浏览器跟服务端可以共用
//下面也会讲到...
import AppRoutes from './routers';

//这里我们创建一个简单的class，暴露一些方法出去，然后在koa路由里去调用来实现服务端渲染
class SSR {
  //koa 路由里会调用这个方法
  render(url, data) {
    let modules = [];
    const context = {};
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={url} context={context}>
          <AppRoutes initialData={data} />
        </StaticRouter>
      </Loadable.Capture>
    );
    //获取服务端已经渲染好的组件数组
    let bundles = getBundles(stats, modules);
    return {
      html,
      scripts: this.generateBundleScripts(bundles),
    };
  }
  //把SSR过的组件都转成script标签扔到html里
  generateBundleScripts(bundles) {
    return bundles.filter(bundle => bundle.file.endsWith('.js')).map(bundle => {
      return `<script type="text/javascript" src="${bundle.file}"></script>\n`;
    });
  }

  static preloadAll() {
    return Loadable.preloadAll();
  }
}

export default SSR;

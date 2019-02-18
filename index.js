import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import AsyncHome from './Home';
import AsyncHello from './Hello';

const Loading = () => <div>Loading...</div>;
const LazyLoad = loader => Loadable({
  loader,
  loading:Loading,
})
// const AsyncHome = LazyLoad(()=>import(/* webpackChunkName: 'Home' */'./Home'));
// const AsyncHello = LazyLoad(()=>import(/* webpackChunkName: 'Hello' */'./Hello'));

export default class A extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route exact path="/hello" component={AsyncHello} />
          </Switch>
        </Router>
      </div>
    )
  }
}

// ReactDOM.render(<A/>, document.getElementById('app'))
// if (module.hot) {
//   module.hot.accept();
// }
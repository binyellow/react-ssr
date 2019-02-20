import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Loadable from 'react-loadable';

const loading = () => <div>Loading...</div>;
const LazyLoad = loader => Loadable({
  loader,
  loading,
  delay: 200,
})
const Home = Loadable({
  loader: ()=> import('./Home'),
  loading,
});
const Hello = Loadable({
  loader: ()=> import('./Hello'),
  loading,
});
// const Hello = LazyLoad(()=> import('./Hello'));
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome to React SSR!"
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>
          <Link to="/">Home</Link>
          <Link to="/hello">Hello</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/hello" exact component={Hello} />
        </Switch>
      </div>
    );
  }
}

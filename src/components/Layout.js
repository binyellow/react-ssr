import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Hello from "./Hello";

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

import React, { Component } from 'react';
import { connect } from 'react-redux'

@connect(
  state=>({ loggedIn: state.loggedIn }),
)
export default class Home extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        Home
        <p>{loggedIn.login}</p>
        <p><a href={loggedIn.url}>click me</a></p>
        <a href={loggedIn.html_url}>{loggedIn.html_url}</a>
      </div>
    )
  }
}

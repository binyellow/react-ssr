import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
        Home
        <br/>
        <Link to="/hello">to Hello</Link>
      </div>
    )
  }
}

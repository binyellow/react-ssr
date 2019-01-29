import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello
        <br/>
        <Link to="/">to home</Link>
      </div>
    )
  }
}

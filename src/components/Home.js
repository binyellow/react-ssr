import React, { Component } from 'react';
import { connect } from 'react-redux'

import styles from './index.css';
@connect(
  state=>({ loggedIn: state.loggedIn }),
)
export default class Home extends Component {
  render() {
    console.log(styles);
    const { loggedIn } = this.props;
    return (
      <div suppressHydrationWarning={true} className={styles.test}>
        Home
        <p>{loggedIn.login}</p>
        <p><a href={loggedIn.url}>click me</a></p>
        <a href={loggedIn.html_url}>{loggedIn.html_url}</a>
      </div>
    )
  }
}

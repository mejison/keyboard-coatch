import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import { Route, Link, Switch } from 'react-router-dom'
import store from '../../store'
import Game from '../game/Game'
import Home from '../home/Home'

export default class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game/:hash" component={Game} />
        </Switch>
      </div>
    );
  }
}
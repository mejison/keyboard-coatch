import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import { routerMiddleware, push } from 'react-router-redux'
import store from '../../store'
import io from 'socket.io-client'
import api from '../../api'

class Home extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getGames();

    const socket = io.connect("http://localhost:4000")
    socket.on('connect', () => {
      socket.on('game:add', (data) => {
        this.props.addGame(data.game)
      });

      socket.on('game:timer', (data) => {
        this.props.updateTimer(data.game)
      });
    });
  }

  playGame(index) {
    const { list } = this.props.games
    store.dispatch(push('/game/' + list[index].hash))
  }

  addGame() {
    api.addGame();
  }

  render() {
    const { list } = this.props.games
    return (
      <div>
          Home
            {
              list.map((g, index) => {
                if ( ! g.hidden)
                return <div key={index}>
                  {g.name} : {g.timer}
                  <button onClick={() => {this.playGame(index)}}>play</button>
                </div>
              })
            }
            <button onClick={this.addGame}>Add Game</button>  
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const mapStateToProps = (state) => {
  return {
		games: state.games
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home)
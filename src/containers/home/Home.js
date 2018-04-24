import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import { routerMiddleware, push } from 'react-router-redux'
import store from '../../store'

class Home extends Component {

  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
  }

  componentWillMount() {
    this.props.getGames();
    // let timer = setInterval(this.tick, 1000);
  }

  tick() {
    const { list } = this.props.games
    
    list.map((g) => {
      g.timer -= 1
      if ( ! g.timer) {
        this.props.hideGame({index : list.indexOf(g), hidden : true})
        return
      }
      this.props.changeTimer({index : list.indexOf(g), timer : g.timer})
    })
  }

  playGame(index) {
    const { list } = this.props.games
    store.dispatch(push('/game/' + list[index].hash))
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
            <button onClick={() => {this.props.addGame()}}>Add Game</button>  
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
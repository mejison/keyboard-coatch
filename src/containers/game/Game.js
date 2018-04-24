import React, { Component } from 'react'
import * as reducers from '../../reducers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import './style.css'
import config from '../../config'
import api from '../../api'
import Cookies from 'js-cookie'

class Game extends Component {
  
  game = {}
  canvas = false
  ctx = false
  current = 0
  text = ""

  componentDidMount() {
    let { hash } = this.props.match.params
    this.props.setGame(hash);
    this.joinPlayer(hash);
    
    this.canvas = document.getElementById('battlefield')
    this.ctx = this.canvas.getContext('2d')
    
    let self = this
    api.getText()
      .then((data) => {
        data = [data.pop()].join(' ')
        this.text = data
        self.props.setTexts(data)
      })
    
    this.keyboardListener() 
  }

  joinPlayer(hash) {
    if ( ! Cookies.get('join-game') || Cookies.get('join-game') != hash) {
      Cookies.set('join-game', hash)
      this.props.addPlayer({hash : hash, player : {name : 'Player New', car : 1}})
    }
  }

  keyboardListener() {
    document.addEventListener('keyup', (e) => {
      let currentKey = this.text[this.current].toLowerCase()
      if (currentKey == e.key) {
        this.current ++
        this.drawPlayers(this.current / this.text.length * 100)
        let text = "<span class='currect'>" + this.text.slice(0, this.current) + '</span>' + this.text.slice(this.current, this.text.length)
        this.props.setTexts(text) 
      }
    })
  }

  drawPlayers(position) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = "green"
    this.ctx.fillRect(0, 0, this.canvas.width, 50 * this.game.players.length)
    
    let height = 0
    let { cars } = config
    this.game.players.map((p) => {
      let img = new Image();
      img.src = cars[p.car].icon
      img.onload = () => {
        this.ctx.drawImage(img, position, height, 40, 40)
        height += 40
      }
    })
  }

  render() {
    let { text } = this.props.texts
    let { game } = this.props.games

    if (game) {
      this.game = game
      this.drawPlayers(10)
    }

    return (
      <div>
        <canvas id="battlefield"></canvas>
        <div dangerouslySetInnerHTML={{__html: text}}></div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const mapStateToProps = (state) => {
  return {
    games: state.games,
    texts: state.texts
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Game)
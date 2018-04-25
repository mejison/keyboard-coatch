import React, { Component } from 'react'
import * as reducers from '../../reducers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import './style.css'
import config from '../../config'
import api from '../../api'
import Cookies from 'js-cookie'
import io from 'socket.io-client'

class Game extends Component {
  
  game = false
  canvas = false
  ctx = false
  current = 0
  text = ""
  socket = false

  socketInit() {
    const socket = io.connect("http://localhost:4000")
    socket.on('connect', () => {
      this.socket = socket

      socket.on('test', (msg) => {
          this.drawPlayers(msg.data.move * 100 / this.strip(this.game.text).length, msg.data.player)
      });
    });
  }

  componentDidMount() {
    let { hash } = this.props.match.params
    this.props.setGame(hash)
    
    this.joinPlayer(hash);
    this.socketInit();
    
    this.canvas = document.getElementById('battlefield')
    this.ctx = this.canvas.getContext('2d')
    
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
      let strip_html = this.strip(this.game.text)
      let currentKey = this.game.text ? strip_html[this.current].toLowerCase() : false
      if (currentKey && currentKey == e.key) {
        this.current ++
        let text = "<span class='currect'>" + strip_html.slice(0, this.current) + '</span>' + strip_html.slice(this.current, strip_html.length)
        this.props.setTexts(text)
        this.palyerMove(Cookies.get('player-id'))
      }
    })
  }

  palyerMove(player) {
    this.socket.emit('player:move', {game : this.game, player : player, move : this.current});
  }

  strip(html) {
    var span = document.createElement("span");
    span.innerHTML = html;
    return span.textContent || span.innerText || "";
  }

  drawPlayers(position, player) {
    player = player || false
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = "green"
    this.ctx.fillRect(0, 0, this.canvas.width, 50 * this.game.players.length)
    
    let height = 0
    let { cars } = config
    this.game.players.map((p) => {
      let img = new Image();
      img.src = cars[p.car].icon
      img.onload = () => {
        position = player && player == p.id ? position : 0
        this.ctx.drawImage(img, position, height, 40, 40)
        height += 40
      }
    })
  }

  render() {
    let { game } = this.props.games
    
    if (game) {
      this.game = game
      this.drawPlayers(this.current * 100 / this.strip(this.game.text).length);
    }

    return (
      <div>
        <canvas id="battlefield"></canvas>
        <div dangerouslySetInnerHTML={{__html: game.text}}></div>
      </div>
    )
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
)(Game)
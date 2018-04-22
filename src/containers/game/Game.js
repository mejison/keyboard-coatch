import React, { Component } from 'react'
import * as reducers from '../../reducers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import './style.css'
import config from '../../config'
import api from '../../api'

class Game extends Component {
  
  game = {}
  canvas = false
  ctx = false
  current = 0
  text = ""

  componentDidMount() {
    this.canvas = document.getElementById('battlefield')
    this.ctx = this.canvas.getContext('2d')
    this.drawPlayers(10)

    let self = this
    api.getText()
      .then((data) => {
        data = [data.pop()]
        self.props.setTexts(data)
      })
    
    this.keyboardListener()
  }

  keyboardListener() {
    document.addEventListener('keyup', (e) => {
      let letter = String.fromCharCode(e.keyCode)
      if (this.text[this.current].toLowerCase() == letter.toLowerCase()) {
        this.current ++
        this.drawPlayers(this.current / this.text.length * 100)
      }
      console.log(this.current)
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
    let { hash } = this.props.match.params
    let { list } = this.props.games
    let { text } = this.props.texts

    this.game = list.find(g => g.hash == hash);
    this.text = text.join(' ')

    return (
      <div>
        <canvas id="battlefield"></canvas>
        <div>
          { this.text.split('').map((l, index) =>  l) }
        </div>
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
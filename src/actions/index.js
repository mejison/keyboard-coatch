import * as types from '../constants/ActionTypes';
import api from '../api';
import Cookies from 'js-cookie';

export function getGames() {
  return dispatch => {
    api.getGames()
    .then((data) => {
      dispatch({
        type: types.SET_GAMES,
        value: data.data
      })
    })
  }
}

export function updateTimer(value) {
  return {
    type: types.UPDATE_TIMER,
    value
  }
}

export function addGame(value) {
  if (value) {
    return {
      type: types.ADD_GAME,
      value: value
    }
  }

  return dispatch => {
      api.addGame()
      .then((data) => {
        dispatch({
          type: types.ADD_GAME,
          value: data.data
        })
      })
    }
}

export function setGame(hash) {
  return dispatch => {
    api.getGame(hash)
      .then((data) => {
        dispatch({
          type : types.SET_GAME,
          value : data.data
        })
      })
  }
}

export function changeTimer(value) {
  return {
    type: types.CHANGE_TIMER,
    value
  }
}

export function hideGame(value) {
  return {
    type: types.HIDDEN_GAME,
    value
  }
}

export function setTexts(value) {
  return {
    type: types.SET_TEXTS,
    value
  }
}

export function addPlayer(value) {
  return dispatch => {
    api.addPlayer(value)
      .then((data) => {
        Cookies.set('player-id', data.data.id)
        setGame(value.hash)
      })
  }
}
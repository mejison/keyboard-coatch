import * as types from '../constants/ActionTypes';

export function addGame(value) {
  return {
    type: types.ADD_GAME,
    value
  };
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
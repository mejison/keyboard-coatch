import * as types from '../constants/ActionTypes';

const initialState = {
  list: [],
  game: false
}

export default function game(game = initialState, action) {
  let list = Object.assign([], game.list);
  switch (action.type) {
    case types.SET_GAMES:
      return Object.assign({}, game, {
        list: action.value
      })
    case types.SET_GAME:
      return Object.assign({}, game, {
        game: action.value
      })
    case types.ADD_GAME:
      return Object.assign({}, game, {
        list: [...list, action.value ]
      })

    case types.HIDDEN_GAME:
      list = list.map((t, index) => {
        if (index == action.value.index) {
          return Object.assign({}, t, { hidden : action.value.hidden })
        }
        return t
      })
      return Object.assign({}, game, { list })
    case types.CHANGE_TIMER:
      list = list.map((g, index) => {
        if (index == action.value.index) {
          return Object.assign({}, g, { timer : action.value.timer })
        }
        return g
      })
      return Object.assign({}, game, { list })
    default:
      return game;
  }
}
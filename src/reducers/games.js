import * as types from '../constants/ActionTypes';

const initialState = {
  list: [
    {hash : '234asdf', name : 'game #1', timer : 45, hidden : false, players : [
      {name : 'Player #3', car : 2}
    ]},
    {hash : '23423sdf', name : 'game #2', timer : 60, hidden : false, players : [
      {name : 'Player #2', car : 3},
      {name : 'Player #3', car : 2}
    ]},
    {hash : '32434sdf', name : 'game #3', timer : 5, hidden : false, players : [
      {name : 'Player #1', car : 1},
      {name : 'Player #2', car : 3},
      {name : 'Player #3', car : 2}
    ]}
  ]
}

export default function game(game = initialState, action) {
  let list = Object.assign([], game.list);
  switch (action.type) {
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
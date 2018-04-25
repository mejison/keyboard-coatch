import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import games from './games'


export default combineReducers({
    router: routerReducer,
    games,
})
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import games from './games'
import texts from './texts'


export default combineReducers({
    router: routerReducer,
    games,
    texts,
})
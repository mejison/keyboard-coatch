import * as types from '../constants/ActionTypes';

const initialState = {
    text : []
}

export default function game(texts = initialState, action) {
    let text = Object.assign([], texts.text);

    switch (action.type) {
        case types.SET_TEXTS:
            return Object.assign({}, texts, {
                text: action.value
            })
        default:
            return texts
    }
}
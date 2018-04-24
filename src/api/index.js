import store from 'store'

const API_URL = 'http://localhost:4000/api'
const TEXT_API_URL = 'https://baconipsum.com/api/?type=meat-and-filler'

const getAuthHeaders = () => {
	return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
	}
}

const responseHandler = (response) => {
    let promise = response.json()
    promise.then(response => {})
    return promise
}

export default {
    getText(data) {
        return fetch(TEXT_API_URL, {
            method: 'get'
        })
        .then(responseHandler)
    },
    getGames() {
        return fetch(API_URL + '/games', {
            headers: getAuthHeaders(),
            method: 'get'
        })
        .then(responseHandler)
    },
    addGame() {
        return fetch(API_URL + '/games', {
            headers: getAuthHeaders(),
            method: 'post',
            body : JSON.stringify({
                name : 'New Game',
                timer : 60,
                hidden : false
            })
        })
        .then(responseHandler)
    },
    getGame(hash) {
        return fetch(API_URL + '/games/' + hash, {
            method: 'get'
        })
        .then(responseHandler)
    },
    addPlayer(params) {
        return fetch(API_URL + '/games/' + params.hash + '/player', {
            method: 'post',
            body: JSON.stringify(params.palyer)
        })
        .then(responseHandler)
    }
}
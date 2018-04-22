import store from 'store'

const API_URL = '/api/v1/'
const TEXT_API_URL = 'https://baconipsum.com/api/?type=meat-and-filler'

const getAuthHeaders = () => {
	return {
		'Accept': 'application/json'
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
            headers: getAuthHeaders(),
            method: 'get'
        })
        .then(responseHandler)
    }
}
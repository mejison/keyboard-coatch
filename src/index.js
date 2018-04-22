import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/app/App'

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
        	<App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
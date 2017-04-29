import React from 'react'
import ReactDOM from 'react-dom'
import Provider from './components/Provider'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import App from './containers/App';
import './reset.css'
import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Build the redux store
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware())
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

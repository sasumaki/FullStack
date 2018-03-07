import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})
const store = createStore(reducer, applyMiddleware(thunk))
console.log(store.getState())

render()
store.subscribe(render)

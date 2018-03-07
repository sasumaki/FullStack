import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

import { createStore, combineReducers } from 'redux'

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})
const store = createStore(reducer)
console.log(store.getState())

render()
store.subscribe(render)

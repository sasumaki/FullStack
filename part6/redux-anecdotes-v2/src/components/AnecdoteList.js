import React from 'react'
import { notify } from '../reducers/notificationReducer'
import Filter from './Filter'
class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotesToShow(anecdotes, this.props.store.getState().filter)
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() => {
                    this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })
                    this.props.store.dispatch(notify('anecdote liked'))
                    setTimeout(() => {
                      this.props.store.dispatch(notify(''))
                    }, 5000)
                  }}
                >
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}
const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}

export default AnecdoteList

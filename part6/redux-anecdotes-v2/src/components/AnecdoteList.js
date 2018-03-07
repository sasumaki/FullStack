import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

import Filter from './Filter'
import { connect } from 'react-redux'
class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  this.props.vote(anecdote)
                  this.props.notify('anecdote liked', 5)
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
const mapDispatchToProps = {
  notify,
  vote
}
const mapStateToProps = state => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

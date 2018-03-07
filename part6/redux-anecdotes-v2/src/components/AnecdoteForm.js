import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createAnecdote(content)
    this.props.notify('created anecdote', 5)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = {
  createAnecdote,
  notify
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)

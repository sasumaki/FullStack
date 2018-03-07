import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {
  console.log('action: ', action)
  switch (action.type) {
  case 'VOTE': {
    const old = state.filter(a => a.id !== action.data.id)
    return [...old, action.data]
  }
  case 'CREATE':
    console.log(action.data)
    return [...state, action.data]

  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}
export const vote = data => {
  console.log(data)
  const newA = { ...data, votes: data.votes + 1 }
  return async dispatch => {
    await anecdoteService.update(data.id, newA)
    dispatch({
      type: 'VOTE',
      data: newA
    })
  }
}
export const anecdoteInitialization = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer

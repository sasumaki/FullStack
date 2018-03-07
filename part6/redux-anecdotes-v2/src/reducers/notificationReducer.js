const initialState = 'initialize'
const reducer = (state = initialState, action) => {
  if (action.type === 'NOTIFICATION') {
    console.log(action.content)
    state = action.content
  }
  return state
}
export const notify = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      content
    })
    setTimeout(
      () => dispatch({ type: 'NOTIFICATION', content: '' }),
      time * 1000
    )
  }
}

export default reducer

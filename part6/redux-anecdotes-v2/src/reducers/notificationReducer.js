const initialState = 'initialize'
const reducer = (state = initialState, action) => {
  if (action.type === 'NOTIFICATION') {
    console.log(action.content)
    state = action.content
  }
  return state
}
export const notify = content => {
  console.log('called notify ', content)
  return { type: 'NOTIFICATION', content: content }
}

export default reducer

const initialState = ''

const reducer = (state = initialState, action) => {
  if (action.type === 'FILTER') {
    state = action.content
  }

  return state
}

export const filter = content => {
  return {
    type: 'FILTER',
    content
  }
}

export default reducer

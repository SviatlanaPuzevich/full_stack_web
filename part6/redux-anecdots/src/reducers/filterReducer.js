const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action filter', action)
  if (action.type === 'SET_FILTER') {
    return action.payload
  }
  return state
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer
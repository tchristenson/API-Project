import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_GROUPS = 'groups/getAllGroups'

const getAllGroupsAction = (payload) => {
  return {
    type: GET_ALL_GROUPS,
    payload
  }
}

// THUNKS
export const getAllGroupsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups')
  if (response.ok) {
    const groups = await response.json()
    // console.log('groups inside of getAllGroupsThunk', groups)
    dispatch(getAllGroupsAction(groups))
  }
}

//REDUCER
const groupReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_GROUPS:
      newState = {...state}
      // console.log('action.payload inside of groupReducer', action.payload)
      action.payload.Groups.forEach(group => newState[group.id] = group)
      return newState
    default:
      return state
  }
}

export default groupReducer

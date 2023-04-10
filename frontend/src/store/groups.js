import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_GROUPS = 'groups/getAllGroups'
const MAKE_NEW_GROUP = 'groups/makeNewGroup'

const getAllGroupsAction = (payload) => {
  return {
    type: GET_ALL_GROUPS,
    payload
  }
}

const makeNewGroupAction = (payload) => {
  return {
    type: MAKE_NEW_GROUP,
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

export const makeNewGroupThunk = (payload) => async (dispatch) => {
  console.log('payload inside of makeNewGroupThunk', payload)
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.groupName,
      about: payload.description,
      type: payload.groupType,
      private: payload.isPrivate,
      city: payload.city,
      state: payload.state
    }

    ),
  });
  if (response.ok) {
    console.log('response inside of makeNewGroupThunk', response)
    const group = await response.json();
    console.log('group inside of makeNewGroupThunk', group)
    dispatch(makeNewGroupAction(group));
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
    case MAKE_NEW_GROUP:
      newState = {...state}
      // newState[action.group.id] = group
    default:
      return state
  }
}

export default groupReducer

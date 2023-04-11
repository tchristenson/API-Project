import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_GROUPS = 'groups/getAllGroups'
const GET_SINGLE_GROUP = 'groups/getSingleGroup'
const MAKE_NEW_GROUP = 'groups/makeNewGroup'

const getAllGroupsAction = (groups) => {
  return {
    type: GET_ALL_GROUPS,
    groups
  }
}

const getSingleGroupAction = (group) => {
  return {
    type: GET_SINGLE_GROUP,
    group
  }
}

const makeNewGroupAction = (group) => {
  return {
    type: MAKE_NEW_GROUP,
    group
  }
}

// THUNKS
export const getAllGroupsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups')
  if (response.ok) {
    const groups = await response.json()
    console.log('groups inside of getAllGroupsThunk', groups)
    dispatch(getAllGroupsAction(groups))
  }
}

export const getSingleGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`)
  if (response.ok) {
    const group = await response.json()
    console.log('group inside of getSingleGroupThunk', group)
    dispatch(getSingleGroupAction(group))
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
      state: payload.state,
      // imageUrl
    }

    ),
  });
  if (response.ok) {
    // console.log('response inside of makeNewGroupThunk', response)
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
      action.groups.Groups.forEach(group => newState[group.id] = group)
      return newState
    case GET_SINGLE_GROUP:
      console.log('action inside of reducer', action)
      newState = {...state}
      console.log('newState inside of reducer before edits', newState)
      newState[action.group.id] = action.group
      console.log('newState inside of reducer after edits', newState)
      return newState
    case MAKE_NEW_GROUP:
      newState = {...state}
      newState[action.group.id] = action.group
      return newState
    default:
      return state
  }
}

export default groupReducer

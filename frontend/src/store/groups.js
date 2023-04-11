import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_GROUPS = 'groups/getAllGroups'
const GET_SINGLE_GROUP = 'groups/getSingleGroup'
const MAKE_NEW_GROUP = 'groups/makeNewGroup'
const EDIT_GROUP = 'groups/editGroup'
const DELETE_GROUP = 'groups/deleteGroup'

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

const editGroupAction = (group) => {
  return {
    type: EDIT_GROUP,
    group
  }
}

const deleteGroupAction = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId
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

export const getSingleGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`)
  if (response.ok) {
    const group = await response.json()
    // console.log('group inside of getSingleGroupThunk', group)
    dispatch(getSingleGroupAction(group))
  }
}

export const makeNewGroupThunk = (group) => async (dispatch) => {
  // console.log('group inside of makeNewGroupThunk', group)
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: group.groupName,
      about: group.description,
      type: group.groupType,
      private: group.isPrivate,
      city: group.city,
      state: group.state,
    }),
  });
  if (response.ok) {
    // console.log('response inside of makeNewGroupThunk', response)
    const newGroup = await response.json();
    // console.log('group inside of makeNewGroupThunk', group)

    const imageResponse = await csrfFetch(`/api/groups/${newGroup.id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: group.imageUrl,
        preview: true
      }),
    })
    if (imageResponse.ok) {
      dispatch(makeNewGroupAction(newGroup));
    }
  }
}

export const editGroupThunk = (editedGroup) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${editedGroup.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editedGroup.groupName,
      about: editedGroup.description,
      type: editedGroup.groupType,
      private: editedGroup.isPrivate,
      city: editedGroup.city,
      state: editedGroup.state,
    }),
  });
  if (response.ok) {
    // console.log('response inside of makeNewGroupThunk', response)
    const group = await response.json();
    // console.log('group inside of makeNewGroupThunk', group)

    const imageResponse = await csrfFetch(`/api/groups/${group.id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: editedGroup.imageUrl,
        preview: true
      }),
    })
    if (imageResponse.ok) {
      dispatch(editGroupAction(group));
    }
  }
}

export const deleteGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    dispatch(deleteGroupAction(groupId))
  }
}

//REDUCER
const groupReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_GROUPS:
      newState = {...state}
      action.groups.Groups.forEach(group => newState[group.id] = group)
      return newState
    case GET_SINGLE_GROUP:
      // console.log('action inside of reducer', action)
      newState = {...state}
      // console.log('newState inside of reducer before edits', newState)
      newState[action.group.id] = action.group
      // console.log('newState inside of reducer after edits', newState)
      return newState
    case MAKE_NEW_GROUP:
      newState = {...state}
      newState[action.group.id] = action.group
      return newState
    case EDIT_GROUP:
      newState = {...state}
      newState[action.group.id] = action.group
    case DELETE_GROUP:
      newState = {...state}
      console.log('newState inside case DELETE Reducer', newState)
      delete newState[action.groupId]
      return newState
    default:
      return state
  }
}

export default groupReducer

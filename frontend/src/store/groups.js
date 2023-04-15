import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_GROUPS = 'groups/getAllGroups'
const GET_SINGLE_GROUP = 'groups/getSingleGroup'
const MAKE_NEW_GROUP = 'groups/makeNewGroup'
const EDIT_GROUP = 'groups/editGroup'
const DELETE_GROUP = 'groups/deleteGroup'

// const history = useHistory()

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
    return groups
  }
}

export const getSingleGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`)
  if (response.ok) {
    const group = await response.json()
    // console.log('group inside of getSingleGroupThunk', group)
    dispatch(getSingleGroupAction(group))
    return group
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
      // history.push(`/groups/${newGroup.id}`)
      dispatch(makeNewGroupAction(newGroup));
      return newGroup
    }
  }
}

export const editGroupThunk = (editedGroup) => async (dispatch) => {
  // console.log('editedGroup inside editGroup thunk', editedGroup)
  // console.log('editedGroup.isPrivate', editedGroup.isPrivate)
  const response = await csrfFetch(`/api/groups/${editedGroup.id}`, {
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
      id: editedGroup.id
    }),
  });
  if (response.ok) {
    // console.log('response inside of editGroupThunk', response)
    const group = await response.json();
    console.log('response.json inside of editGroupThunk', group)
    // history.push(`/groups/${group.id}`)
    dispatch(editGroupAction(group));
    return group
  }
}

export const deleteGroupThunk = (groupId) => async (dispatch) => {
  const groupResponse = await csrfFetch(`/api/groups/${groupId}`);
  const deletedGroup = await groupResponse.json()
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    dispatch(deleteGroupAction(groupId))
    return {'message': 'delete successful',
    'deletedGroup': deletedGroup
  }
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
      newState = {...state}
      newState[action.group.id] = action.group
      return newState
    case MAKE_NEW_GROUP:
      newState = {...state}
      newState[action.group.id] = action.group
      return newState
    case EDIT_GROUP:
      newState = {...state}
      newState[action.group.id] = action.group
      return newState
    case DELETE_GROUP:
      newState = {...state}

      // // START - scratch work to fix cascade issue
      // // Get the keys from the current state and place them into an array
      // const keys = Object.keys(newState)
      // // map over the keys, and each group will be an object with its properties, all held in an array. An array of objects
      // const groupsArr = Object.keys(newState).map(group => {
      //   return {...newState[group]}
      // })

      // // iterate over the groupArr and access the nested Events objects. Put those into their own events Array
      // const eventsArr = [];
      // for (let i = 0; i < groupsArr.length; i++) {
      //   let currEvents = groupsArr[i].Events
      //   currEvents.forEach(event => {
      //     eventsArr.push(event)
      //   })
      // }

      // // filter over the array of objects, removing the group who's id matches the action.groupId that was deleted
      // const filteredGroupsArr = groupsArr.filter((group) => group.id !== action.groupId)

      // // filter over the array of objects, removing the event who's id matches the action.groupId that was deleted
      // const filteredEventsArr = eventsArr.filter((event) => event.groupId !== action.groupId)

      // // Normalize the both arrays to get them back into an objects - had issues with forEach, so used a regular for loop
      // const filteredGroupsObj = {}
      // for (let i = 0; i < filteredGroupsArr.length; i++) {
      //   let currGroup = filteredGroupsArr[i]
      //   filteredGroupsObj[currGroup.id] = currGroup
      // }

      // const filteredEventsObj = {}
      // for (let i = 0; i < filteredEventsArr.length; i++) {
      //   let currEvent = filteredEventsArr[i]
      //   filteredEventsObj[currEvent.id] = currEvent
      // }

      // console.log('keys inside reducer', keys)
      // console.log('groupsArr inside reducer', groupsArr)
      // console.log('eventsArr inside reducer', eventsArr)
      // console.log('filteredGroupsArr inside reducer', filteredGroupsArr)
      // console.log('filteredEventsArr inside reducer', filteredEventsArr)
      // console.log('filteredGroupsObj inside reducer', filteredGroupsObj)
      // console.log('filteredEventsObj inside reducer', filteredEventsObj)

      // newState.groups = filteredGroupsObj
      // newState.events = filteredEventsObj
      // return newState

      // // END - scratch work to fix cascade issue

      delete newState[action.groupId]
      return newState
    default:
      return state
  }
}

export default groupReducer

import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_EVENTS = 'events/getAllEvents'

const getAllEventsAction = (payload) => {
  console.log('payload inside of action', payload)
  return {
    type: GET_ALL_EVENTS,
    payload
  }
}

// THUNKS
export const getAllEventsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/events')
  if (response.ok) {
    const events = await response.json()
    // console.log('events inside of getAllEventsThunk', events)
    dispatch(getAllEventsAction(events))
  }
}

//REDUCER
const eventReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_EVENTS:
      newState = {...state}
      // console.log('action.payload inside of eventReducer', action.payload)
      action.payload.Events.forEach(event => newState[event.id] = event)
      // console.log('newState inside events reducer', newState)
      return newState
    default:
      return state
  }
}

export default eventReducer
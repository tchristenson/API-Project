import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_EVENTS = 'events/getAllEvents'
const GET_SINGLE_EVENT = 'events/getSingleEvent'

const getAllEventsAction = (payload) => {
  console.log('payload inside of action', payload)
  return {
    type: GET_ALL_EVENTS,
    payload
  }
}

const getSingleEventAction = (event) => {
  return {
    type: GET_SINGLE_EVENT,
    event
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

export const getSingleEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`)
  if (response.ok) {
    const event = await response.json()
    console.log('event inside of getSingleEventThunk', event)
    dispatch(getSingleEventAction(event))
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
    case GET_SINGLE_EVENT:
      newState = {...state}
      console.log('newState inside GET_SINGLE_EVENT Reducer case', newState)
      console.log('action inside GET_SINGLE_EVENT Reducer case', action)
      newState[action.event.id] = action.event
      console.log('newState inside GET_SINGLE_EVENT Reducer case ---- AFTER', newState)
      return newState
    default:
      return state
  }
}

export default eventReducer

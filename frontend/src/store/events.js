import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_EVENTS = 'events/getAllEvents'
const GET_SINGLE_EVENT = 'events/getSingleEvent'
const MAKE_NEW_EVENT = 'events/makeNewEvent'

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

const makeNewEventAction = (event) => {
  return {
    type: MAKE_NEW_EVENT,
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

export const makeNewEventThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${payload.groupId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // backend is expecting venueId and capacity but they are not provided
      // on the frontend. Hard coding these two items here
      venueId: 1,
      capacity: 10,
      name: payload.name,
      type: payload.type,
      price: payload.price,
      description: payload.description,
      startDate: payload.startDate,
      endDate: payload.endDate,
      private: payload.isPrivate
    }),
  });
  if (response.ok) {
    const newEvent = await response.json()
    console.log('newEvent inside newEvent thunk', newEvent)

    const imageResponse = await csrfFetch(`/api/events/${newEvent.id}/images`,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: payload.url,
        preview: true
      }),
    })
    if (imageResponse.ok) {
      dispatch(makeNewEventAction(newEvent))
      return newEvent
    }
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
      // console.log('newState inside GET_SINGLE_EVENT Reducer case', newState)
      // console.log('action inside GET_SINGLE_EVENT Reducer case', action)
      newState[action.event.id] = action.event
      // console.log('newState inside GET_SINGLE_EVENT Reducer case ---- AFTER', newState)
      return newState
    case MAKE_NEW_EVENT:
      newState = {...state}
      console.log('state inside MAKE NEW EVENT case', newState)
      newState[action.event.id] = action.event
      console.log('state inside MAKE NEW EVENT case --- Revised', newState)
      return newState
    default:
      return state
  }
}

export default eventReducer

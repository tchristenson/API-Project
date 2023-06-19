import { csrfFetch } from "./csrf";

// ACTIONS
const GET_ALL_EVENTS = 'events/getAllEvents'
const GET_SINGLE_EVENT = 'events/getSingleEvent'
const MAKE_NEW_EVENT = 'events/makeNewEvent'
const DELETE_EVENT = 'events/deleteEvent'

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

export const deleteEventAction = (eventId) => {
  return {
    type: DELETE_EVENT,
    eventId
  }
}

// THUNKS
export const getAllEventsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/events')
  if (response.ok) {
    const events = await response.json()
    // console.log('events inside of getAllEventsThunk', events)
    dispatch(getAllEventsAction(events))
    return events
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
    const formData = new FormData();
    formData.append('url', payload.url)

    for (let key of formData.entries()) {
        console.log('formData inside of the thunk', key[0] + '----->' + key[1]);
        }

    const imageResponse = await csrfFetch(`/api/events/${newEvent.id}/images`,  {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
    if (imageResponse.ok) {
      dispatch(makeNewEventAction(newEvent))
      return newEvent
    }
  }
}

export const deleteEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    dispatch(deleteEventAction(eventId))
    return {'message': 'delete successful'}
  }
}

//REDUCER
const eventReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_EVENTS:
      newState = {...state}
      action.payload.Events.forEach(event => newState[event.id] = event)
      return newState
    case GET_SINGLE_EVENT:
      newState = {...state}
      newState[action.event.id] = action.event
      return newState
    case MAKE_NEW_EVENT:
      newState = {...state}
      newState[action.event.id] = action.event
      return newState
    case DELETE_EVENT:
      newState = {...state}
      delete newState[action.eventId]
      return newState
    default:
      return state
  }
}

export default eventReducer

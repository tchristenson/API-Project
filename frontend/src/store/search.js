import {csrfFetch} from "./csrf"

// ACTIONS
const SEARCH_GROUPS_EVENTS = 'search/searchGroupsEvents'
const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults'

const searchGroupsEventsAction = (payload) => {
    return {
        type: SEARCH_GROUPS_EVENTS,
        payload
    }
}

const clearSearchResultsAction = (payload) => {
    return {
        type: CLEAR_SEARCH_RESULTS,
        payload
    }
}

// THUNKS
export const searchGroupsEventsThunk = (query) => async (dispatch) => {
    console.log('query inside thunk ------->', query)
    const response = await csrfFetch('/api/search', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query
        })
    })
    if (response.ok) {
        const searchResults = await response.json()
        console.log('searchResults from backend after response.json ------->', searchResults)
        dispatch(searchGroupsEventsAction(searchResults))
        return searchResults
    }
}

export const clearSearchResultsThunk = () => async (dispatch) => {
    dispatch(clearSearchResultsAction({}))
}

// REDUCER
const searchReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SEARCH_GROUPS_EVENTS:
            newState = {...state}
            let id = 1;
            console.log('action.payload inside reducer', action.payload)
            action.payload.searchResults.forEach(item => {
              newState[id] = item;
              id += 1;
              console.log('newState inside for loop --->', newState)
            });
            return newState
        case CLEAR_SEARCH_RESULTS:
            newState = {...state}
            newState = action.payload
            return newState
        default:
            return state
    }
}

export default searchReducer

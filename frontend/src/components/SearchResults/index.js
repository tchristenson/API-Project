import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import styles from './SearchResults.module.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { dateTimeFix } from "../Events"

function SearchResults() {

    const searchResults = useSelector(state => state.search)
    const searchResultsArr = Object.values(searchResults)
    console.log('searchResults', searchResults)
    console.log('searchResultsArr', searchResultsArr)

    const groups = searchResultsArr.filter(result => {
        return !result.hasOwnProperty('groupId')
    })

    const events = searchResultsArr.filter(result => {
        return result.hasOwnProperty('groupId')
    })

    const groupsList = groups.map(group => (
        <NavLink key={group.id} className="nav-link" to={`/groups/${group.id}`}>
        <div className="single-group">
          <div className="group-image">
            <img src={group.previewImage} alt="Group Image" />
          </div>
          <div className="group-info">
            <div className="group-name"><h3>{group.name}</h3></div>
            <div className="group-city-state">{group.city}, {group.state}</div>
            <div className="group-about">{group.about}</div>
            <div className="event-private-container">
              {(group.Events === undefined || group.Events.length === 0) ? (
                  <div className="group-event-count">No events</div>
                ) : (
                  <div className="group-event-count">{group.Events.length === 1 ? `${group.Events.length} Event` : `${group.Events.length} Events`}</div>
              )}
              <div><span className="dot">.</span></div>
              <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
            </div>
          </div>
        </div>
      </NavLink>
    ))

    const eventsList = events.map(event => (
        <NavLink key={event.id} className="nav-link" to={`/events/${event.id}`}>
        <div className="single-event">
          <div className="image-event-wrapper">
            <div className="event-image">
             <img src={event.previewImage} alt="Group Image" />
            </div>
            <div className="event-info">
              <div className="date-time-wrapper">
                <div className="event-date">{dateTimeFix(event.startDate)[0]}</div>
                <div><span className="dot-in-event-details-of-group-page">.</span></div>
                <div className="event-time">{dateTimeFix(event.startDate)[1]}</div>
              </div>
              <div className="event-name"><h3>{event.name}</h3></div>
              <div className="event-city-state">{event.Group.city}, {event.Group.state}</div>
            </div>
          </div>
          <div className="event-about">{event.description}</div>
        </div>
      </NavLink>

    ))

    console.log('groups', groups)
    console.log('events', events)

    const searchResultsList = searchResultsArr.map(result => (
        // <NavLink key={result.id}>
            <div className={styles['single-result']}>
                {result.name}
            </div>
        // {/* </NavLink> */}
    ))

    console.log('searchResultsList', searchResultsList)

    return (
        <div>
            <h2>Your search results:</h2>
            <h3>Groups:</h3>
            <div>{groupsList}</div>
            <h3>Events:</h3>
            <div>{eventsList}</div>
        </div>
    )
}

export default SearchResults

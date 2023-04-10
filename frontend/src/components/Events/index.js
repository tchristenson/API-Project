import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllEventsThunk } from "../../store/events"
import "./Events.css"

function Events() {
  const dispatch = useDispatch()
  const events = useSelector(state => Object.values(state.events))
  // console.log('events inside of Events component', events)

  useEffect(() => {
    dispatch(getAllEventsThunk())
  }, [dispatch])

  const eventList = events.map(event => (
    <NavLink className="nav-link" to={`/event/${event.id}`}>
      <div className="single-event" key={event.id}>
        <div className="image-event-wrapper">
          <div className="event-image">
            {event.previewImage}
          </div>
          <div className="event-info">
            <div className="event-date-time">{event.startDate}</div>
            <div className="event-name"><h3>{event.name}</h3></div>
            <div className="event-city-state">{event.Group.city}, {event.Group.state}</div>
          </div>
        </div>
        <div className="event-about placeholder">PLACEHOLDER FOR EVENT DESCRIPTION</div>
      </div>
    </NavLink>
  ))

  return (
    <body>
      <div className="event-and-group-links">
        <NavLink exact to="/events">Events</NavLink>
        <NavLink exact to="/groups">Groups</NavLink>
      </div>
      <div className="subheader">
        <h5>Events in Meetup</h5>
      </div>
      <div className="full-event-list">
        {eventList}
      </div>
    </body>
  )
}

export default Events

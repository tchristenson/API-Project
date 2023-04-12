import "./EventDetails.css"
import { useParams, NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleEventThunk } from "../../store/events"
import { useEffect } from "react"
import { dateTimeFix } from "../Events"

function EventDetails() {
  const dispatch = useDispatch()
  let {eventId} = useParams()
  eventId = parseInt(eventId)

  useEffect(() => {
    dispatch(getSingleEventThunk(eventId))
  }, [dispatch, eventId])

  const event = useSelector(state => state.events[eventId])
  console.log('event inside of EventDetail', event)


  return (
    <body>
      <div className="breadcrumb-link">
        <span>{'< '}<NavLink to='/events'>Events</NavLink></span>
      </div>
      <h2>{event.name}</h2>
      <h5 className="event-organizer">{`Hosted by ${event.Group.User.firstName} ${event.Group.User.lastName}`}</h5>
      <div className="event-container">
        <div className="event-image">
          {event.previewImage}
        </div>
        <div className="group-event-info-container">
          <div className="group-image-detail">
            <div className="group-image">
              {event.Group.previewImage}
              Group Image
            </div>
            <div className="group-detail-container">
              <div>{event.Group.name}</div>
              <div>{event.Group.private ? "Private" : "Public"}</div>
            </div>
          </div>
          <div className="event-details">
            <div className="start-container">
              <div className="start-date">Start {dateTimeFix(event.startDate)[0]}</div>
              <div className="start-time">{dateTimeFix(event.startDate)[1]}</div>
            </div>
            <div className="end-container">
              <div className="end-date">End {dateTimeFix(event.endDate)[0]}</div>
              <div className="end-time">{dateTimeFix(event.endDate)[1]}</div>
            </div>
            <div className="event-price">{`$${event.price}`}</div>
            <div>{event.type}</div>
          </div>
        </div>
      </div>
      <h2>Details</h2>
      <p className="event-description">{event.description}</p>
    </body>
  )
}

export default EventDetails

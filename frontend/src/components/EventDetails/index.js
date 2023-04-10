import "./EventDetails.css"
import { useParams, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

function EventDetails() {

  const {eventId} = useParams()

  const event = useSelector(state => state.events[eventId])
  console.log('event price', event.price)
  console.log('event inside of EventDetail', event)

  return (
    <body>
      <div className="breadcrumb-link">
        <span>{'< '}<NavLink to='/events'>Events</NavLink></span>
      </div>
      <h2>{event.name}</h2>
      <h5 className="placeholder">PLACEHOLDER FOR ORGANIZER'S NAME</h5>
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
            <div>Start {event.startDate}</div>
            <div>End {event.endDate}</div>
            <div className="placeholder">{event.price}Event Price</div>
            <div>{event.type}</div>
          </div>
        </div>
      </div>
      <h2>Details</h2>
      <p className="placeholder">PLACEHOLDER TEXT ABOUT THE EVENT</p>
    </body>
  )
}

export default EventDetails

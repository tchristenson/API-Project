import "./EventDetails.css"
import { useParams, NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleEventThunk } from "../../store/events"
import { useEffect } from "react"
import { dateTimeFix } from "../Events"
import OpenModalButton from "../OpenModalButton"
import DeleteEventModal from "../EventDeleteModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function EventDetails() {
  const dispatch = useDispatch()
  let {eventId} = useParams()
  eventId = parseInt(eventId)

  useEffect(() => {
    dispatch(getSingleEventThunk(eventId))
  }, [dispatch, eventId])

  const currUser = useSelector(state => state.session.user)
  // console.log('currUser inside GroupDetails', currUser)
  const event = useSelector(state => state.events[eventId])
  if (!event ||  !event.Group || !event.Group.User) return null

  const organizerId = event.Group.User.id
  // console.log('organizerId inside GroupDetails', organizerId)

  console.log('event inside of EventDetail', event)

  return (
    <div className="content">
      <div className="breadcrumb-link">
        <span>{'< '}<NavLink to='/events'>Events</NavLink></span>
      </div>
      <h2>{event.name}</h2>
      <h5 className="event-organizer">{`Hosted by ${event.Group.User.firstName} ${event.Group.User.lastName}`}</h5>
      <div className="whole-event-container">
        <div className="event-image">
          {event.previewImage}
          <img src={event.EventImages[0].url} alt="Event Image" />
        </div>
        <div className="group-event-info-container">
        <NavLink className="nav-link" to={`/groups/${event.Group.id}`}>
          <div className="group-image-detail">
            <div className="group-image-inside-event-details">
              <img src={event.Group.GroupImages[0].url} alt="Group Image" />
            </div>
            <div className="group-detail-container">
              <div>{event.Group.name}</div>
              <div className="private-public-in-event-detail">{event.Group.private ? "Private" : "Public"}</div>
            </div>
          </div>
        </NavLink>
          <div className="event-details">

              <div className="clock-and-date-container">
                <div className="clock-icon-event-details">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="start-and-end-container">
                  <div className="start-container">
                    <div className="start-date"><span>START</span> {dateTimeFix(event.startDate)[0]}</div>
                    <div><span className="dot-in-event-details-page">.</span></div>
                    <div className="start-time">{dateTimeFix(event.startDate)[1]}</div>
                  </div>
                  <div className="end-container">
                    <div className="end-date"><span>END</span> {dateTimeFix(event.endDate)[0]}</div>
                    <div><span className="dot-in-event-details-page">.</span></div>
                    <div className="end-time">{dateTimeFix(event.endDate)[1]}</div>
                  </div>
                </div>
              </div>
            <div className="event-price-container-event-details">
              <i id="font-awesome-dollar-sign" className="fa-sharp fa-solid fa-dollar-sign"></i>
              <div className="event-price">{event.price === 0 ? 'FREE' : `$${event.price}`}</div>
            </div>
            <div className="event-type-buttons-container">
              <div className="event-type-container-event-details">
                <i id="font-awesome-location-icon" className="fa-solid fa-location-dot"></i>
                <div className="online-in-person-in-event-detail">{event.type}</div>
              </div>
              <div className="update-delete-buttons-on-event-detail">
                {currUser && currUser.id === organizerId && (
                  <>
                    <Link to={`/groups/${event.Group.id}/events/${eventId}/edit`}>
                        <button>Update</button>
                    </Link>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteEventModal event={event} eventId={eventId}/>}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Description</h2>
      <p className="event-description">{event.description}</p>
    </div>
  )
}

export default EventDetails

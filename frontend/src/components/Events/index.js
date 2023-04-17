import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { getAllEventsThunk } from "../../store/events"
import "./Events.css"

  // Helper function to format date/time received from backend
  export const dateTimeFix = str => {
    const stringArr = str.split('T')
    const date = stringArr[0]
    let time = stringArr[1]
    time = [time.split(':')[0], time.split(':')[1]]
    let hours = time[0]
    let minutes = time[1]

    if (hours > 12) {
      hours -= 12
      hours = hours.toString()
      time = hours.concat(':').concat(minutes).concat('pm')
    }
    else if (hours === 12) {
      hours = hours.toString()
      time = hours.concat(':').concat(minutes).concat('pm')
    }
    else {
      hours = hours.toString()
      time = hours.concat(':').concat(minutes).concat('am')
    }
    return [date, time]
  }

function Events() {
  const dispatch = useDispatch()

  const events = useSelector(state => state.events)
  const eventsArr = Object.values(events)

  useEffect(() => {
    dispatch(getAllEventsThunk())
  }, [dispatch])

    // console.log('events inside All Events', events)
    console.log('eventsArr inside of All Events', eventsArr)
    // console.log('events.Events inside All Events', events.Events)

    if (!events) return null

    // const sortedEventsArr = eventsArr.sort((event1, event2) => new Date(event1.startDate).getTime() - new Date(event2.startDate).getTime())
    // console.log(sortedEventsArr)

    const currentDate = new Date()

// I was mapping over eventsArr in the original approach
  const eventList = eventsArr.filter(event =>
    new Date(event.startDate).getTime() > currentDate.getTime())
    .sort((event1, event2) => new Date(event1.startDate).getTime() - new Date(event2.startDate).getTime())
    .map(event => (
    <NavLink className="nav-link" to={`/events/${event.id}`}>
      <div className="single-event" key={event.id}>
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
            <div className="event-city-state">{event.Venue.address},  {event.Venue.city}, {event.Venue.state}</div>
          </div>
        </div>
        <div className="event-about">{event.description}</div>
      </div>
    </NavLink>
  ))

  // console.log('eventList', eventList)

  const pastEventList = eventsArr.filter(event =>
    new Date(event.startDate).getTime() < currentDate.getTime())
    .sort((event1, event2) => new Date(event2.startDate).getTime() - new Date(event1.startDate).getTime())
    .map(event => (
    <NavLink className="nav-link" to={`/events/${event.id}`}>
      <div className="single-event" key={event.id}>
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

  // console.log('pastEventList', pastEventList)

  return (
    <div className="content">
      <div className="event-and-group-links">
        <NavLink className="current-page" exact to="/events">Events</NavLink>
        <NavLink exact to="/groups">Groups</NavLink>
      </div>
      <div className="subheading">
        <h5>Events in Meetup</h5>
      </div>
      <div className="full-event-list">
        <>
          {eventList}
          {pastEventList}
        </>
      </div>
    </div>
  )
}

export default Events

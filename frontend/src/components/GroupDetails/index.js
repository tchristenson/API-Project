import "./GroupDetails.css"
import { useParams, NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleGroupThunk } from "../../store/groups"
import { useEffect } from "react"
import DeleteGroupModal from "../GroupDeleteModal"
import OpenModalButton from "../OpenModalButton";
import { dateTimeFix } from "../Events"


function GroupDetails() {
  const dispatch = useDispatch()
  let {groupId} = useParams()
  groupId = parseInt(groupId)
  // console.log('groupId inside GroupDetail component', (groupId))

  useEffect(() => {
    dispatch(getSingleGroupThunk(groupId))
  }, [dispatch, groupId])



  const currUser = useSelector(state => state.session.user)
  const group = useSelector(state => state.groups[groupId])

  if (!group || !group.Organizer ) return null

  const currentDate = new Date()

  const upcomingEventsList = group.Events.filter(event =>
    new Date(event.startDate).getTime() > currentDate.getTime())
    .map(event => (
      <div className="event-container">
          <div className="image-and-details">
            <div className="event-image" key={event.id}>
              <img src={event.EventImages.url} alt="event image"/>
            </div>
            <div className="event-info">
              <div className="date-time-wrapper">
                <div className="event-date">{dateTimeFix(event.startDate)[0]}</div>
                <div className="event-time">{dateTimeFix(event.startDate)[1]}</div>
              </div>
              <div className="event-name"><h4>{event.name}</h4></div>
              <div className="event-location">{event.Venue.address}</div>
            </div>
          </div>
          <div className="event-about">{event.description}</div>
        </div>
    ));

  const pastEventsList = group.Events.filter(event =>
    new Date(event.startDate).getTime() < currentDate.getTime())
    .map(event => (
      <div className="event-container">
          <div className="image-and-details">
            <div className="event-image" key={event.id}>
              <img src={event.EventImages.url} alt="event image"/>
            </div>
            <div className="event-info">
              <div className="date-time-wrapper">
                <div className="event-date">{dateTimeFix(event.startDate)[0]}</div>
                <div className="event-time">{dateTimeFix(event.startDate)[1]}</div>
              </div>
              <div className="event-name"><h4>{event.name}</h4></div>
              <div className="event-location">{event.Venue.address}</div>
            </div>
          </div>
          <div className="event-about">{event.description}</div>
        </div>
    ));

  // console.log('typeof groupId inside GroupDetail component', typeof (groupId))
  // console.log('currUserId inside GroupDetail component', currUserId)
  // console.log('typeof currUserId inside GroupDetail component', typeof currUserId)
  console.log('group inside of GroupDetail component', group)
  const organizerId = group.Organizer.id
  // console.log('organizerId inside of GroupDetail component', organizerId)

  // console.log('groupId', groupId)
  // console.log('group.GroupImages[0].url printing here ------>', group.GroupImages[0].url)
  function handleClick() {
    alert('Feature Coming Soon...')
  }

  return (
    <body>
      <div className="breadcrumb-link">
        <span>{'< '}<NavLink to='/groups'>Groups</NavLink></span>
      </div>
      <div className="group-and-image-wrapper">
        {group.GroupImages.length ? (
          <div className="group-image">
            {group.GroupImages[0].url}
          </div>
          ) : (
          <div className="group-image">
          Preview Image Unavailable
        </div>
        )}
        <div className="group-info">
          <div className="group-name"><h3>{group.name}</h3></div>
          <div className="group-city-state">{group.city}, {group.state}</div>
          <div className="event-private-container">
            <div className="group-event-count">{group.Events.length > 1 ? `${group.Events.length} Events` : `${group.Events.length} Event`}</div>
            <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
          </div>
          <div className="group-organizer">Organized by {group.Organizer.firstName} {group.Organizer.lastName}</div>

          {currUser && currUser.id !== organizerId && (
            <button className="join-group-button" onClick={handleClick}>Join this group</button>
          )}
          {currUser && currUser.id === organizerId && (
            <>

              <Link to={`/groups/${groupId}/events/new`}>
                <button className="create-event-button">Create event</button>
              </Link>

              <Link to={`/groups/${group.id}/edit`}>
                <button className="update-group-button">Update</button>
              </Link>

              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteGroupModal groupId={groupId}/>}
              />
            </>
          )}


        </div>
      </div>
      <div></div>
      <div className="organizer-info">
        <h3>Organizer</h3>
        <h5>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
      </div>
      <div className="about-info">
        <h3>What we're about</h3>
        <h5>{group.about}</h5>
      </div>
      <div className="upcoming-event-info">
        <h3>Upcoming Events {`(${upcomingEventsList.length})`}</h3>
        <div className="upcoming-event-wrapper">
          {upcomingEventsList}
        </div>
      </div>
      <div className="past-event-info">
        <h3>Past Events {`(${pastEventsList.length})`}</h3>
        <div className="past-event-wrapper">
          {pastEventsList}
        </div>
      </div>
    </body>
  )
}

export default GroupDetails

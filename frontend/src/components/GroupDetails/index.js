import "./GroupDetails.css"
import { useParams, NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleGroupThunk } from "../../store/groups"
import { requestMembershipThunk, deleteMembershipThunk, getMembersByGroupThunk } from "../../store/memberships"
import { useEffect, useState } from "react"
import DeleteGroupModal from "../GroupDeleteModal"
import OpenModalButton from "../OpenModalButton";
import { dateTimeFix } from "../Events"

function GroupDetails() {
  const dispatch = useDispatch()
  let {groupId} = useParams()
  groupId = parseInt(groupId)

//   const [joinButton, setJoinButton] = useState(membershipRequested?.length === 0? true : false)

  useEffect(() => {
    dispatch(getSingleGroupThunk(groupId))
    dispatch(getMembersByGroupThunk(groupId))
  }, [dispatch, groupId])

  const currUser = useSelector(state => state.session.user)
  const group = useSelector(state => state.groups[groupId])
  const memberships = useSelector(state => state.memberships)

  console.log('currUser.id', currUser.id)

  console.log('memberships ------>', memberships)
  const membershipsArr = Object.values(memberships)
  console.log('membershipsArr ------>', membershipsArr)

  const membershipRequested = membershipsArr.filter(membership => membership.memberId === currUser.id)
  console.log('membershipRequested ------>', membershipRequested)

  if (!group || !group.Organizer ) return null

  const currentDate = new Date()

  console.log('group.Events inside of Group Detail Page', group.Events)

  const upcomingEventsList = group.Events.filter(event =>
    new Date(event.startDate).getTime() > currentDate.getTime())
    .sort((event1, event2) => new Date(event1.startDate).getTime() - new Date(event2.startDate).getTime())
    .map(event => (
      <NavLink key={event.id} to={`/events/${event.id}`}>
        <div className="event-container">
            <div className="image-and-details">
              <div className="event-image-in-group-detail" key={event.id}>
                {console.log('event.EventImages[0].url', event.EventImages[0].url)}
                <img src={event.EventImages[0].url} alt="event image"/>
                {/* {event.EventImages.length && (<img src={event.EventImages[0].url} alt="event image"/>)} */}

              </div>
              <div className="event-info">
                <div className="date-time-wrapper">
                  <div className="event-date">{dateTimeFix(event.startDate)[0]}</div>
                  <div><span className="dot-in-event-details-of-group-page">.</span></div>
                  <div className="event-time">{dateTimeFix(event.startDate)[1]}</div>
                </div>
                <div className="event-name"><h4>{event.name}</h4></div>
                <div className="event-location">{event.Venue.address}, {event.Venue.city}, {event.Venue.state}</div>
              </div>
            </div>
            <div className="event-about">{event.description}</div>
          </div>
      </NavLink>
    ));

  const pastEventsList = group.Events.filter(event =>
    new Date(event.startDate).getTime() < currentDate.getTime())
    .sort((event1, event2) => new Date(event2.startDate).getTime() - new Date(event1.startDate).getTime())
    .map(event => (
      <NavLink key={event.id} to={`/events/${event.id}`}>
        <div className="event-container">
            <div className="image-and-details">
              <div className="event-image-in-group-detail" key={event.id}>
                <img src={event.EventImages[0].url} alt="event image"/>
              </div>
              <div className="event-info">
                <div className="date-time-wrapper">
                  <div className="event-date">{dateTimeFix(event.startDate)[0]}</div>
                  <div><span className="dot-in-event-details-of-group-page">.</span></div>
                  <div className="event-time">{dateTimeFix(event.startDate)[1]}</div>
                </div>
                <div className="event-name"><h4>{event.name}</h4></div>
                <div className="event-location">{event.Venue.address}, {event.Venue.city}, {event.Venue.state}</div>
              </div>
            </div>
            <div className="event-about">{event.description}</div>
          </div>
      </NavLink>
    ));

  const organizerId = group.Organizer.id

  const handleMembership = () => {
    if (!membershipRequested.length) {
        dispatch(requestMembershipThunk(groupId))
    } else {
        dispatch(deleteMembershipThunk(groupId, currUser.id))
    }
  }

  return (
    <div className="content">
      <div className="breadcrumb-link">
        <span>{'< '}<NavLink to='/groups'>Groups</NavLink></span>
      </div>
      <div className="group-and-image-wrapper">
        {group.GroupImages.length ? (
          <div className="group-image">
            <img src={group.GroupImages[0].url} alt="Group Image" />
          </div>
          ) : (
          <div className="group-image">
          Preview Image Unavailable
        </div>
        )}
        <div className="group-button-wrapper">
          <div className="group-info-in-group-detail">

              <div className="group-name"><h3>{group.name}</h3></div>
              <div className="group-city-state">{group.city}, {group.state}</div>
              <div className="event-private-container">
                <div className="group-event-count">{group.Events.length > 1 || group.Events.length === 0 ? `${group.Events.length} Events` : `${group.Events.length} Event`}</div>
                <div><span className="dot">.</span></div>
                <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
              </div>
              <div className="group-organizer">Organized by {group.Organizer.firstName} {group.Organizer.lastName}</div>

          </div>

          <div className="group-buttons">
            {currUser && currUser.id !== organizerId && !membershipRequested.length && (
              <button className="join-group-button-in-group-details" onClick={handleMembership}>Join this group</button>
            )}
            {currUser && currUser.id !== organizerId && membershipRequested.length && (
              <button className="membership-requested-button-in-group-details" onClick={handleMembership}>Membership requested</button>
            )}
            {currUser && currUser.id === organizerId && (
              <>
                <Link to={`/groups/${groupId}/events/new`}>
                  <button className="organizer-buttons-in-group-details">Create event</button>
                </Link>

                <Link to={`/groups/${group.id}/edit`}>
                  <button className="organizer-buttons-in-group-details">Update</button>
                </Link>


                <OpenModalButton
                  buttonText="Delete"
                  className="organizer-buttons-in-group-details"
                  modalComponent={<DeleteGroupModal groupId={groupId}/>}
                />
              </>
            )}
          </div>
        </div>

      </div>
      <div className="gray-wrapper">
        <div className="organizer-info">
          <h3>Organizer</h3>
          <h5>{group.Organizer.firstName} {group.Organizer.lastName}</h5>
        </div>
        <div className="about-info">
          <h3>What we're about</h3>
          <h5>{group.about}</h5>
        </div>
        {upcomingEventsList.length > 0 && (
          <div className="upcoming-event-info">
            <h3>Upcoming Events {`(${upcomingEventsList.length})`}</h3>
            <div className="upcoming-event-wrapper">
              {upcomingEventsList}
            </div>
          </div>
        )}
        {pastEventsList.length > 0 && (
          <div className="past-event-info">
            <h3>Past Events {`(${pastEventsList.length})`}</h3>
            <div className="past-event-wrapper">
              {pastEventsList}
            </div>
          </div>
        )}
        {!upcomingEventsList.length && !pastEventsList.length && (
          <div className="no-upcoming-events">
            <h3>No Upcoming Events</h3>
          </div>
        )}

      </div>
    </div>
  )
}

export default GroupDetails

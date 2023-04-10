import "./GroupDetails.css"
import { useParams, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"


function GroupDetails() {

  const {groupId} = useParams()
  // console.log('groupId', groupId)
  const group = useSelector(state => state.groups[groupId])
  // console.log('group inside of GroupDetail', group)

  return (
    <body>
      <div className="breadcrumb-link">
        <span>{'< '}<NavLink to='/groups'>Groups</NavLink></span>
      </div>
      <div className="group-and-image-wrapper">
        <div className="group-image">
          {group.previewImage}
        </div>
        <div className="group-info">
          <div className="group-name"><h3>{group.name}</h3></div>
          <div className="group-city-state">{group.city}, {group.state}</div>
          <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
          <div className="placeholder">PLACEHOLDER - must add # of events</div>
          <div className="group-organizer">{group.organizerId} MUST ADD ORGANIZER NAME</div>
          <button className="join-group-button">Join this group</button>
        </div>
      </div>
      <div></div>
      <div className="organizer-info">
        <h3>Organizer</h3>
        <h5>{group.organizerId} MUST ADD ORGANIZER NAME</h5>
      </div>
      <div className="about-info">
        <h3>What we're about</h3>
        <h5 className="placeholder">PLACEHOLDER TEXT</h5>
      </div>
      <div className="upcoming-event-info placeholder">
        <h3>Upcoming Events - MUST INCLUDE NUMBER OF EVENTS & CONDITONAL RENDERING</h3>
        <div className="upcoming-event-wrapper placeholder">PLACEHOLDER FOR EVENT INFO</div>
      </div>
      <div className="past-event-info placeholder">
        <h3>Past Events - MUST INCLUDE NUMBER OF EVENTS & CONDITONAL RENDERING</h3>
        <div className="past-event-wrapper placeholder">PLACEHOLDER FOR EVENT INFO</div>
      </div>
    </body>
  )
}

export default GroupDetails
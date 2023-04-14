import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllGroupsThunk } from "../../store/groups"
import { useState } from "react"
import "./Groups.css"

function Groups() {
  const dispatch = useDispatch()
  // console.log('groups inside of Groups component', groups)

  // // original
  // useEffect(() => {
  //   dispatch(getAllGroupsThunk())
  // }, [dispatch])

  // const groups = useSelector(state => state.groups)

  // // original stop

  // new approach - getting groups using thunk instead of useSelector
  const [groups, setGroups] = useState('')

  useEffect(() => {
    dispatch(getAllGroupsThunk())
    .then((data) => setGroups(data))
  }, [dispatch])

  console.log('groups inside All Groups', groups)
  console.log('groups.Groups inside All Groups', groups.Groups)

  if (!groups) return null

// Change const groupList to equal groupsArr.map if going back to original
// also now returning from the getAllGroupsThunk whereas I wasn't prior
  // const groupsArr = Object.values(groups)

  const groupList = groups.Groups.map(group => (
    <NavLink className="nav-link" to={`/groups/${group.id}`}>
      <div className="single-group" key={group.id}>
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
            <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
          </div>
        </div>
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
        <h5>Groups in Meetup</h5>
      </div>
      <div className="full-group-list">
        {groupList}
      </div>
    </body>
  )
}

export default Groups

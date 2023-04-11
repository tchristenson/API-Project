import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllGroupsThunk } from "../../store/groups"
import "./Groups.css"

function Groups() {
  const dispatch = useDispatch()
  const groups = useSelector(state => Object.values(state.groups))
  console.log('groups inside of Groups component', groups)

  useEffect(() => {
    dispatch(getAllGroupsThunk())
  }, [dispatch])

  const groupList = groups.map(group => (
    <NavLink className="nav-link" to={`/groups/${group.id}`}>
      <div className="single-group" key={group.id}>
        <div className="group-image">
          {group.previewImage}
        </div>
        <div className="group-info">
          <div className="group-name"><h3>{group.name}</h3></div>
          <div className="group-city-state">{group.city}, {group.state}</div>
          <div className="group-about">{group.about}</div>
          <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
          <div className="placeholder">PLACEHOLDER - must add # of events</div>
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

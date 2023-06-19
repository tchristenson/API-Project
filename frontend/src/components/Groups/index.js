import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getAllGroupsThunk } from "../../store/groups"
import "./Groups.css"

function Groups() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(getAllGroupsThunk())
  }, [dispatch])

  const groups = useSelector(state => state.groups)
  if (!groups) return null

  const groupsArr = Object.values(groups)
  console.log('groupsArr', groupsArr)

  const groupList = groupsArr.filter(group => {
    if (query === '') {
        return group;
    } else if (group.name.toLowerCase().includes(query.toLowerCase())) {
        return group
    } else if (group.city.toLowerCase().includes(query.toLowerCase())) {
        return group
    } else if (group.state.toLowerCase().includes(query.toLowerCase())) {
        return group
    }
  })
  .map(group => (
    <NavLink key={group.id} className="nav-link" to={`/groups/${group.id}`}>
      <div className="single-group">
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
            <div><span className="dot">.</span></div>
            <div className="group-private-status">{group.private ? "Private" : "Public"}</div>
          </div>
        </div>
      </div>
    </NavLink>
  ))

  return (
    <div className="content">
      <div className="event-and-group-links">
        <NavLink exact to="/events">Events</NavLink>
        <NavLink className="current-page" exact to="/groups">Groups</NavLink>
      </div>
      <div className="subheading">
        <h5>Groups in Meetup</h5>
      </div>
        <div className='search-bar-container'>
            <input
                className='search-bar'
                value={query}
                onChange={e => setQuery(e.target.value)}
                type='search'
                placeholder="Search"
            />
        </div>
      <div className="full-group-list">
        {groupList}
      </div>
    </div>
  )
}

export default Groups

import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllGroupsThunk } from "../../store/groups"
import "./Groups.css"

function Groups() {
  const dispatch = useDispatch()
  const groups = useSelector(state => Object.values(state.groups))
  console.log('groups inside of Groups component', groups)

  const groupList = groups.map(group => (
    <div key={group.id}>
      {group.name}
      {group.city}
      {group.state}
      {group.about}
      {group.private}
      {group.previewImage}
    </div>
  ))


  useEffect(() => {
    dispatch(getAllGroupsThunk())
  }, [dispatch])





  return (
    <body>
      <div className="event-and-group-links">
        <NavLink exact to="/events">Events</NavLink>
        <NavLink exact to="/groups">Groups</NavLink>
      </div>
      <div className="subheader">
        <h5>Groups in Meetup</h5>
      </div>
      <div>
        {groupList}
      </div>
    </body>
  )
}

export default Groups

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import styles from './UserProfilePage.module.css'
import { getGroupsByUserThunk } from "../../store/groups";


function UserProfilePage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {userId} = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const sessionUserGroups = useSelector(state => state.groups)
    const sessionUserGroupsArr = Object.values(sessionUserGroups)
    console.log('sessionUserGroupsArr', sessionUserGroupsArr)

    useEffect(() => {
        dispatch(getGroupsByUserThunk())
    }, [dispatch])

    if (!sessionUser) return null

    const userGroupsList = sessionUserGroupsArr.map(group => (
        <NavLink key={group.id} className="nav-link" to={`/groups/${group.id}`}>
          <div className={styles["profile-single-group"]}>
            <div className={styles["profile-group-image-container"]}>
              <img className={styles["profile-group-image"]} src={group.previewImage} alt="Group Image" />
            </div>
            <div className={styles["profile-group-info"]}>
              <h3>{group.name}</h3>
              <h4 className={styles["profile-subheader"]}>{group.city}, {group.state}</h4>
              <h4 className={styles["profile-subheader"]}>{group.about}</h4>
            </div>
          </div>
        </NavLink>
      ))

    return (
        <div className={styles["profile-page-container"]}>
            <h1>{`Hello, ${sessionUser.firstName}`}</h1>
            <div className={styles["profile-groups-container"]}>
                {userGroupsList}
            </div>

        </div>
    )
}

export default UserProfilePage

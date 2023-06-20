import { useEffect, useState } from "react";
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

    const [showOrganized, setShowOrganized] = useState(true)
    const [showMemberships, setShowMemberships] = useState(false)
    const [showPending, setShowPending] = useState(false)

    useEffect(() => {
        dispatch(getGroupsByUserThunk())
    }, [dispatch])

    if (!sessionUser) return null

    const organizedGroups = sessionUserGroupsArr.filter(group => {
        return group.Memberships.some(membership => membership.status === 'organizer' && membership.userId === sessionUser.id)
    })

    const memberGroups = sessionUserGroupsArr.filter(group => {
        return group.Memberships.some(membership => membership.status === 'member' && membership.userId === sessionUser.id || membership.status === 'co-host' && membership.userId === sessionUser.id)
    })

    const pendingGroups = sessionUserGroupsArr.filter(group => {
        return group.Memberships.some(membership => membership.status === 'pending' && membership.userId === sessionUser.id)
    })

    console.log('organizedGroups', organizedGroups)
    console.log('memberGroups', memberGroups)
    console.log('pendingGroups', pendingGroups)

    const organizedGroupList = organizedGroups.map(group => (
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

    const memberGroupList = memberGroups.map(group => (
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

    const pendingGroupList = pendingGroups.map(group => (
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
            <div className={styles["toggle-buttons-container"]}>
                <div className={styles["toggle-buttons"]}>
                    <h3 className={showOrganized? styles["toggle-button-selected"] : styles["toggle-button"]} onClick={() => {setShowOrganized(true); setShowMemberships(false); setShowPending(false)}}>Organized Groups</h3>
                    <h3 className={showMemberships? styles["toggle-button-selected"] : styles["toggle-button"]} onClick={() => {setShowOrganized(false); setShowMemberships(true); setShowPending(false)}}>Memberships</h3>
                    <h3 className={showPending? styles["toggle-button-selected"] : styles["toggle-button"]} onClick={() => {setShowOrganized(false); setShowMemberships(false); setShowPending(true)}}>Pending Memberships</h3>
                </div>
            </div>
            <div className={styles["profile-groups-container"]}>
                {showOrganized && organizedGroupList.length >= 1 && organizedGroupList }
                {showOrganized && organizedGroupList.length === 0 &&
                    <div className={styles['no-members']}>It's empty in here, go make some groups!</div>
                }

                {showMemberships && memberGroupList.length >= 1 && memberGroupList }
                {showMemberships && memberGroupList.length === 0 &&
                    <div className={styles['no-members']}>It's empty in here, go join some groups!</div>
                }

                {showPending && pendingGroupList.length >= 1 && pendingGroupList }
                {showPending && pendingGroupList.length === 0 &&
                    <div className={styles['no-members']}>It's empty in here, go join some groups!</div>
                }

                {/* {showMemberships && memberGroupList.length >= 1 ? (
                    memberGroupList
                    ) : (
                    <div className={styles['no-members']}>It's empty in here, go make some groups!</div>
                    )
                }
                {showPending && pendingGroupList.length >= 1 ? (
                    pendingGroupList
                    ) : (
                    <div className={styles['no-members']}>It's empty in here, go make some groups!</div>
                    )
                } */}

            </div>
        </div>
    )
}

export default UserProfilePage

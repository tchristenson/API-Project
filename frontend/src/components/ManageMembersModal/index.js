import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { changeMemberStatusThunk, getMembersByGroupThunk } from "../../store/memberships";
import styles from './ManageMembersModal.module.css'

function ManageMembersModal({groupId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [statusUpdated, setStatusUpdated] = useState(false)

    useEffect(() => {
        dispatch(getMembersByGroupThunk(groupId))
        setStatusUpdated(false)
      }, [dispatch, groupId, statusUpdated])

    const memberships = useSelector(state => state.memberships)
    const membershipsArr = Object.values(memberships)
    console.log('memberships inside modal ------>', memberships)
    console.log('membershipsArr inside modal ------>', membershipsArr)

    const handleMemberStatus = (groupId, member) => {
        if (member.Membership.status === 'co-host') {
            alert('Group can only have one organizer')
        } else if (member.Membership.status === 'organizer') {
            alert("You are already this group's organizer")
        } else {
            dispatch(changeMemberStatusThunk(groupId, member))
            setStatusUpdated(true)
        }
    }

    const membershipList = membershipsArr.map(member => (
        <div key={member.id} className={styles['member-container']}>
            <div className={styles['member-name']}>
                <h4>{member.firstName} {member.lastName}</h4>
            </div>
            <div className={styles['status-button-container']}>
                <div className={styles['member-status']}>
                    <h4>{((member.Membership.status).charAt(0).toUpperCase()).concat((member.Membership.status).slice(1))}</h4>
                </div>
                <div className={styles['edit-membership-button-container']}>
                    {(member.Membership.status === 'pending' || member.Membership.status === 'member') &&
                    <button onClick={() => handleMemberStatus(groupId, member)} className={styles['edit-membership-button']}>+</button>
                    }
                </div>
            </div>
        </div>
    ))

    return (
        <div className={styles['modal-container']}>
            {membershipList}
        </div>
    )
}

export default ManageMembersModal

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import styles from './ManageMembersModal.module.css'

function ManageMembersModal({membershipsArr}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

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
                    <button className={styles['edit-membership-button']}>+</button>
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

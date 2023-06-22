
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteEventThunk } from "../../store/events";
import "./DeleteMembershipModal.css";
import { requestMembershipThunk, deleteMembershipThunk } from "../../store/memberships";

function DeleteMembershipModal({groupId, membershipRequested}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const currUser = useSelector(state => state.session.user)
//   const group = useSelector(state => state.groups[groupId])
//   const memberships = useSelector(state => state.memberships)

  const handleMembership = () => {
    if (!membershipRequested.length) {
        dispatch(requestMembershipThunk(groupId))
    } else {
        dispatch(deleteMembershipThunk(groupId, currUser.id))
        closeModal()
    }
  }

//   console.log('group ------>', group)
//   console.log('memberships ------>', memberships)
//   const membershipsArr = Object.values(memberships)
//   console.log('membershipsArr ------>', membershipsArr)

//   const membershipRequested = membershipsArr.filter(membership => membership.memberId === currUser.id)
//   console.log('membershipRequested ------>', membershipRequested)
//   console.log('membershipRequested[0] ------>', membershipRequested[0])

  return (
    <div className="delete-container">
      <h2>Confirm Delete</h2>
      <h4>Are you sure you want to cancel your membership?</h4>

      <button id="delete-membership-button" onClick={handleMembership}>
        {'Yes (Cancel Membership)'}
      </button>
      <button id="cancel-delete-membership-button" onClick={closeModal}>
        {'No (Keep Membership)'}
      </button>
    </div>
  );
}

export default DeleteMembershipModal;

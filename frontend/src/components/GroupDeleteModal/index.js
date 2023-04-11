
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteGroupThunk } from "../../store/groups";
import "./DeleteGroup.css";

function DeleteGroupModal({groupId}) {
  const dispatch = useDispatch();
  console.log('groupId inside of DeleteGroupModal', groupId)
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteGroupThunk(groupId))
    closeModal()

    history.push('/groups')
  };

  return (
    <div className="delete-container">
      <h2>Confirm Delete</h2>
      <h4>Are you sure you want to remove this group?</h4>

      <button onClick={handleDelete}>
        {'Yes (Delete Group)'}
      </button>
      <button onClick={closeModal}>
        {'No (Keep Group)'}
      </button>

    </div>
  );
}

export default DeleteGroupModal;

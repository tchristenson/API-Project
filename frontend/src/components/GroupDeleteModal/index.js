
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

  const handleDelete = async (e) => {
    console.log('handle delete running')
    e.preventDefault();

    const deletedResult = await dispatch(deleteGroupThunk(groupId))
    if (deletedResult.message === 'delete successful') {
      console.log('if deletedResult running')
      console.log('deletedResult', deletedResult)
      history.push('/groups')

      closeModal()
    }

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

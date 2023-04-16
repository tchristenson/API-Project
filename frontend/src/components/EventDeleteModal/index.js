
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteEventThunk } from "../../store/events";
import "./DeleteEvent.css";

function DeleteEventModal({event, eventId}) {
  const dispatch = useDispatch();
  console.log('eventId inside of DeleteEventModal', eventId)
  const history = useHistory()
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    console.log('handle delete running')
    e.preventDefault();

    const deletedResult = await dispatch(deleteEventThunk(eventId))
    if (deletedResult.message === 'delete successful') {
      console.log('if deletedResult running')
      console.log('deletedResult', deletedResult)
      history.push(`/groups/${event.Group.id}`)

      closeModal()
    }
  };

  return (
    <div className="delete-container">
      <h2>Confirm Delete</h2>
      <h4>Are you sure you want to remove this event?</h4>

      <button id="delete-event-button" onClick={handleDelete}>
        {'Yes (Delete Event)'}
      </button>
      <button id="cancel-delete-event-button" onClick={closeModal}>
        {'No (Keep Event)'}
      </button>
    </div>
  );
}

export default DeleteEventModal;

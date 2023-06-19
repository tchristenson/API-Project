import EventForm from "../EventForm";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleEventThunk } from "../../store/events";
import { getSingleGroupThunk } from "../../store/groups";


const EditEventForm = () => {
  const { groupId, eventId } = useParams();
  console.log('groupId', groupId)
  console.log('eventId', eventId)
  const dispatch = useDispatch();
  const [event, setEvent] = useState('');
  const [group, setGroup] = useState('');


  useEffect(() => {
    dispatch(getSingleGroupThunk(groupId))
    .then((data) => setGroup(data))
    dispatch(getSingleEventThunk(eventId))
    .then((data) => setEvent(data))
  }, [dispatch])

//   if (!event) return(<></>);

  console.log('event before sending to event form', event)
  console.log('group before sending to group form', group)

  return (
    // Object.keys(event).length > 1 && (
      <>
        <EventForm
          group={group}
          event={event}
          formType="Edit Event"
        />
      </>
    // )
  );
}

export default EditEventForm

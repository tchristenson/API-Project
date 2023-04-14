import EventForm from "../EventForm";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getSingleGroupThunk } from "../../store/groups";

const CreateEventForm = () => {
  const {groupId} = useParams()
  const dispatch = useDispatch()
  const [group, setGroup] = useState('');

  useEffect(() => {
    dispatch(getSingleGroupThunk(groupId))
    .then((data) => setGroup(data))
  }, [dispatch])

  if (!group) return(<></>);

  const event = {
    name: '',
    type: '',
    isPrivate: '',
    price: 0,
    startDate: '',
    endDate: '',
    url: '',
    description: ''
  };

return (
  <EventForm
    event={event}
    group={group}
    formType="Create Event"
  />
)
}

export default CreateEventForm

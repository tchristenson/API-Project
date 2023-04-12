import EventForm from "../EventForm";

const CreateEventForm = () => {
  const event = {
    name: '',
    type: '',
    private: '',
    price: 0,
    startDate: '',
    endDate: '',
    url: '',
    description: ''
  };

return (
  <EventForm
    event={event}
    formType="Create Event"
  />
)
}

export default CreateEventForm

import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fileTypeCheck } from "../GroupForm"
import './EventNew.css'

function EventForm({event, formType}) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const {groupId} = useParams()
  const group = useSelector(state => state.groups[groupId])
  console.log('group inside of Event Form', group)


  const history = useHistory();
  const [name, setName] = useState(event?.name)
  const [type, setType] = useState(event?.type)
  const [isPrivate, setIsPrivate] = useState(event?.isPrivate)
  const [price, setPrice] = useState(event?.price)
  const [startDate, setStartDate] = useState(event?.startDate)
  const [endDate, setEndDate] = useState(event?.endDate)
  const [url, setUrl] = useState(event?.url)
  const [description, setDescription] = useState(event?.description)

  useEffect(() => {
    if (hasSubmitted) {
      const newErrors = {};
      if (!name) newErrors['name'] = 'Name is required'
      if (!type) newErrors['type'] = 'Event Type is required'
      if (!isPrivate) newErrors['isPrivate'] = 'Visibility is required'
      if (price < 0) newErrors['price'] = 'Price is required'
      if (!startDate) newErrors['startDate'] = 'Event start is required'
      if (!endDate) newErrors['endDate'] = 'Event end is required'
      if (!['png', 'jpg', 'jpeg'].includes(fileTypeCheck(url))) newErrors['url'] = 'Image URL must end in .png, .jpg, or .jpeg'
      if (description.length < 30) newErrors['description'] = 'Description must be at least 30 characters long'
      setErrors(newErrors)
    }
  }, [name, type, isPrivate, price, startDate, endDate, url, description])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true);

    const payload = {
      name,
      type,
      isPrivate,
      price,
      startDate,
      endDate,
      url,
      description,
      id: event?.id
    }

    setName('')
    setType('')
    setIsPrivate('')
    setPrice(0)
    setStartDate('')
    setEndDate('')
    setUrl('')
    setDescription('')
    setErrors({})
    setHasSubmitted(false)

    if (formType === 'Create Event') {
      // this is where you'll dispatch the makeNewEventThunk with the payload. Remember to await the dispatch
      // Then you'll probably have to history.push the user to that event page
    }

    if (formType === 'Edit Event') {
      // this is where you'll dispatch the editEventThunk with the payload. Remember to await the dispatch
      // Then you'll probably have to history.push the user to that event page
    }
  }


  return (
    <form className="new-event-form" onSubmit={handleSubmit}>
      <h2>Create an event for</h2>

    </form>
  )
}

export default EventForm

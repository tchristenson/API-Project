import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fileTypeCheck } from "../GroupForm"
import './EventNew.css'

function EventForm({event, formType}) {
  const dispatch = useDispatch()
  const {groupId} = useParams()
  const history = useHistory();

  const [name, setName] = useState(event?.name)
  const [type, setType] = useState(event?.type)
  const [isPrivate, setIsPrivate] = useState(event?.isPrivate)
  const [price, setPrice] = useState(event?.price)
  const [startDate, setStartDate] = useState(event?.startDate)
  const [endDate, setEndDate] = useState(event?.endDate)
  const [url, setUrl] = useState(event?.url)
  const [description, setDescription] = useState(event?.description)
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

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

  const group = useSelector(state => state.groups[groupId])
  if (!group) return null
  console.log('group inside of Event Form', group)

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
      <h2>{`Create an event for ${group.name}`}</h2>

      <div className="event-name-wrapper">
        <h4>What is the name of your event?</h4>
        <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name && (<p className='errors'>{errors.name}</p>)}
      </div>

      <div className="type-private-price-wrapper">
        <h4>Is this an in person or online event?</h4>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={'Online'}>Online</option>
          <option value={'In Person'}>In Person</option>
        </select>
        {errors.type && (<p className='errors'>{errors.type}</p>)}

        <h4>Is this event private or public?</h4>
        <select value={isPrivate} onChange={e => setType(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={true}>Private</option>
          <option value={false}>Public</option>
        </select>
        {errors.isPrivate && (<p className='errors'>{errors.isPrivate}</p>)}

        <h4>What is the price of your event?</h4>
        <input
          type="number"
          placeholder="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        {errors.price && (<p className='errors'>{errors.price}</p>)}
      </div>

      <div className="date-wrapper">
        <h4>When does your event start?</h4>
        <input
          type="datetime-local"
          value={startDate}
          onChange={e => setPrice(e.target.value)}
        />
        {errors.startDate && (<p className='errors'>{errors.startDate}</p>)}

        <h4>When does your event end?</h4>
        <input
          type="datetime-local"
          value={endDate}
          onChange={e => setPrice(e.target.value)}
        />
        {errors.endDate && (<p className='errors'>{errors.endDate}</p>)}
      </div>

      <div className="url-wrapper">
        <h4>Please add an image url for your event below</h4>
        <input
            type="text"
            placeholder="Image URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          {errors.url && (<p className='errors'>{errors.url}</p>)}
      </div>

      <div>
        <h4>Please describe your event</h4>
        <textarea
            placeholder="Please include at least 30 characters"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {errors.description && (<p className='errors'>{errors.description}</p>)}
      </div>

      <div className='submit-button'>
        <button type="submit">{formType === 'Create Event' ? 'Create Event' : 'Update Event' }</button>
      </div>

    </form>
  )
}

export default EventForm

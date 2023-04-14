import { useState, useEffect } from "react"
import { useHistory} from "react-router"
import { useDispatch } from "react-redux"
import { fileTypeCheck } from "../GroupForm"
import { makeNewEventThunk } from "../../store/events"
import './EventNew.css'

function EventForm({event, group, formType}) {
  const dispatch = useDispatch();
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

  // console.log('errors', errors)

  useEffect(() => {

      const newErrors = {};
      if (!name) newErrors['name'] = 'Name is required'
      if (!type) newErrors['type'] = 'Event Type is required'

      if (typeof isPrivate !== 'boolean') newErrors['isPrivate'] = 'Visibility is required'
      if (price < 0) newErrors['price'] = 'Price is required'
      if (!startDate) newErrors['startDate'] = 'Event start is required'
      if (!endDate) newErrors['endDate'] = 'Event end is required'
      if (!['png', 'jpg', 'jpeg'].includes(fileTypeCheck(url))) newErrors['url'] = 'Image URL must end in .png, .jpg, or .jpeg'
      if (description.length < 30) newErrors['description'] = 'Description must be at least 30 characters long'
      console.log('newErrors', newErrors)
      // const startCheck = new Date(startDate).getTime()
      // console.log('startCheck', startCheck)
      setErrors(newErrors)

  }, [name, type, isPrivate, price, startDate, endDate, url, description, hasSubmitted])

  // console.log('group inside of Event Form', group)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true);
    const errorArr = Object.values(errors)
    if (errorArr.length) return

    const payload = {
      name,
      type,
      isPrivate,
      price,
      startDate,
      endDate,
      url,
      description,
      // id: event?.id,
      groupId: group.id
    }

    console.log('payload inside of EventForm', payload)

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
      const newEvent = await dispatch(makeNewEventThunk(payload))
      history.push(`/events/${newEvent.id}`)
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
            required={true}
            placeholder="Event Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {hasSubmitted && errors.name && (<p className='errors'>{errors.name}</p>)}
      </div>

      <div className="type-private-price-wrapper">
        <h4>Is this an in person or online event?</h4>
        <select required value={type} onChange={e => setType(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={'Online'}>Online</option>
          <option value={'In Person'}>In Person</option>
        </select>
        {hasSubmitted && errors.type && (<p className='errors'>{errors.type}</p>)}

        <h4>Is this event private or public?</h4>
        <select required value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={true}>Private</option>
          <option value={false}>Public</option>
        </select>
        {hasSubmitted && errors.isPrivate && (<p className='errors'>{errors.isPrivate}</p>)}

        <h4>What is the price of your event?</h4>
        <input
          type="number"
          required={true}
          placeholder="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        {hasSubmitted && errors.price && (<p className='errors'>{errors.price}</p>)}
      </div>

      <div className="date-wrapper">
        <h4>When does your event start?</h4>
        <input
            type="text"
            required={true}
            placeholder="MM/DD/YYYY HH:mm AM"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        {hasSubmitted && errors.startDate && (<p className='errors'>{errors.startDate}</p>)}

        <h4>When does your event end?</h4>
        <input
            type="text"
            required={true}
            placeholder="MM/DD/YYYY HH:mm PM"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        {hasSubmitted && errors.endDate && (<p className='errors'>{errors.endDate}</p>)}
      </div>

      <div className="url-wrapper">
        <h4>Please add an image url for your event below</h4>
        <input
            type="text"
            required={true}
            placeholder="Image URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          {hasSubmitted && errors.url && (<p className='errors'>{errors.url}</p>)}
      </div>

      <div>
        <h4>Please describe your event</h4>
        <textarea
            placeholder="Please include at least 30 characters"
            required={true}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {hasSubmitted && errors.description && (<p className='errors'>{errors.description}</p>)}
      </div>

      <div className='submit-button'>
        <button type="submit">{formType === 'Create Event' ? 'Create Event' : 'Update Event' }</button>
      </div>

    </form>
  )
}

export default EventForm

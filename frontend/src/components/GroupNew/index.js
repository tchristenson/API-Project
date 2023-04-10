import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './GroupNew.css'

function NewGroup() {

  const history = useHistory();
  const [location, setLocation] = useState('');
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [groupType, setGroupType] = useState('')
  const [isPrivate, setIsPrivate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const fileTypeCheck = (str) => {
    const stringArr = str.split('.');
    const finalEl = stringArr[stringArr.length -1]
    return finalEl
  }

  useEffect(() => {
    if (hasSubmitted) {
      const newErrors = {};
      if (!location) newErrors['location'] = 'Location is required'
      if (!groupName) newErrors['groupName'] = 'Name is required'
      if (description.length < 30) newErrors['description'] = 'Description must be at least 30 characters long'
      if (!groupType) newErrors['groupType'] = 'Group Type is required'
      if (isPrivate !== 'Online' || isPrivate !== 'In Person') newErrors['isPrivate'] = 'Visibility type is required'
      if (!['png', 'jpg', 'jpeg'].includes(fileTypeCheck(imageUrl))) newErrors['imageUrl'] = 'Image URL must end in .png, .jpg, or .jpeg'
      setErrors(newErrors);
    }
  }, [location, groupName, description, groupType, isPrivate, imageUrl])

  function handleSubmit(e) {
    e.preventDefault()
    setHasSubmitted(true);

    setLocation('')
    setGroupName('')
    setDescription('')
    setGroupType('')
    setIsPrivate('')
    setImageUrl('')
    setErrors({})
    setHasSubmitted(false)

    // Must build in navigation to new group detail page upon successful creation
    // thinking I'll need useSelector and get the group.id from there
  }

  return(
    <form className='new-group-form' onSubmit={handleSubmit}>
      <div className='header-container'>
        <h4>BECOME AN ORGANIZER</h4>
        <h2>We'll walk you through a few steps to build your local community</h2>
      </div>

      <div className='location-container'>
        <h2>First, set your group's location</h2>
        <p>
          Meetup groups meet locally, in person and online. We'll connect you with people
          in your area, and more can join you online.
        </p>
        <input
          type="text"
          placeholder="City, STATE"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        {errors.location && (<p className='errors'>{errors.location}</p>)}
      </div>

      <div className='name-container'>
        <h2>What will your group's name be?</h2>
        <p>
          Choose a name that will give people a clear idea of what the group is about.
          Feel free to get creative! You can edit this later if you change your mind.
        </p>
        <input
          type="text"
          placeholder="What is your group name?"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        {errors.groupName && (<p className='errors'>{errors.groupName}</p>)}
      </div>

      <div className='about-container'>
        <h2>Now describe what your group will be about</h2>
        <p>
          People will see this when we promote your group,
          but you'll be able to add to it later, too.
        </p>
        <ol>
          <li>What's the purpose of the group?</li>
          <li>Who should join?</li>
          <li>What will you do at your events?</li>
        </ol>
        <input
          type="text-area"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {errors.description && (<p className='errors'>{errors.description}</p>)}
      </div>

      <div className='final-steps-container'>
        <h2>Final steps...</h2>

        <p>Is this an in person or online group?</p>
        <select onChange={e => setGroupType(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={groupType}>Online</option>
          <option value={groupType}>In Person</option>
        </select>
        {errors.groupType && (<p className='errors'>{errors.groupType}</p>)}

        <p>Is this group private or public?</p>
        <select onChange={e => setIsPrivate(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={isPrivate}>Private</option>
          <option value={isPrivate}>Public</option>
        </select>
        {errors.isPrivate && (<p className='errors'>{errors.isPrivate}</p>)}

        <p>
          Please add an image url for your group below:
        </p>
        <input
          type="text"
          placeholder="https://somewhere/com/image.gif"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        {errors.imageUrl && (<p className='errors'>{errors.imageUrl}</p>)}
      </div>
      <div className='submit-button'>
        <button>Create Group</button>
      </div>

    </form>
  )
}

export default NewGroup

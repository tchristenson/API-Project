import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupNew.css'
import { makeNewGroupThunk, editGroupThunk } from '../../store/groups';

function GroupForm({ group, formType }) {

  // console.log('group inside of group form', group)

  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const history = useHistory();
  const [location, setLocation] = useState(group?.location);
  const [groupName, setGroupName] = useState(group?.groupName)
  const [description, setDescription] = useState(group?.description)
  const [groupType, setGroupType] = useState(group?.groupType)
  const [isPrivate, setIsPrivate] = useState(group?.isPrivate)
  const [imageUrl, setImageUrl] = useState(group?.imageUrl)

  // HELPER FUNCTIONS FOR DATA VALIDATION / SANITIZING
  const fileTypeCheck = (str) => {
    const stringArr = str.split('.');
    const finalEl = stringArr[stringArr.length -1]
    return finalEl
  }

  const cityStateSplit = (str) => {
    const stringArr = str.split(',')
    const city = stringArr[0]
    const state = (stringArr[1].trim())
    return [city, state]
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true);

    const payload = {
      city: cityStateSplit(location)[0],
      state: cityStateSplit(location)[1],
      groupName,
      description,
      groupType,
      isPrivate,
      imageUrl,
      id: group?.id
    }

    // console.log('payload inside of GroupForm', payload)

    setLocation('')
    setGroupName('')
    setDescription('')
    setGroupType('')
    setIsPrivate('')
    setImageUrl('')
    setErrors({})
    setHasSubmitted(false)

    if (formType === 'Create Group') dispatch(makeNewGroupThunk(payload))
    if (formType === 'Edit Group') dispatch(editGroupThunk(payload))

    // console.log('newGroup after dispatching to thunk', newGroup)

    // newGroup.then((data) => {
    //   console.log('data from resolved promise', data)
    // })

    // Must build in navigation to new group detail page upon successful creation
    // thinking I'll need useSelector and get the group.id from there
  }

  return(
    <form className='new-group-form' onSubmit={handleSubmit}>
      <div className='header-container'>
        {formType === 'Create Group' ? (
          <>
            <h4>BECOME AN ORGANIZER</h4>
            <h2>We'll walk you through a few steps to build your local community</h2>
          </>
        ) : (
          <>
            <h4>UPDATE YOUR GROUP'S INFORMATION</h4>
            <h2>We'll walk you through a few steps to update your group's information</h2>
          </>
        )}
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
        <textarea
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
          <option value={'Online'}>Online</option>
          <option value={'In Person'}>In Person</option>
        </select>
        {errors.groupType && (<p className='errors'>{errors.groupType}</p>)}

        <p>Is this group private or public?</p>
        <select onChange={e => setIsPrivate(e.target.value)}>
          <option value="">{'(select one)'}</option>
          <option value={true}>Private</option>
          <option value={false}>Public</option>
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
        <button type="submit">{formType === 'Create Group' ? 'Create Group' : 'Update Group' }</button>
      </div>

    </form>
  )
}

export default GroupForm

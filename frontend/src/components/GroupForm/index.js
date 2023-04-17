import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './GroupNew.css'
import { makeNewGroupThunk, editGroupThunk } from '../../store/groups';

  // HELPER FUNCTIONS FOR DATA VALIDATION / SANITIZING
  export const fileTypeCheck = (str) => {
    const stringArr = str.split('.');
    const finalEl = stringArr[stringArr.length -1]
    return finalEl
  }

  const cityStateSplit = (str) => {
    const stringArr = str.split(',')
    // console.log('stringArr', stringArr)
    if (stringArr.length) {
      const city = stringArr[0]
      const state = (stringArr[1].trim())
      return [city, state]
    }
  }

function GroupForm({ group, formType }) {

  const sessionUser = useSelector(state => state.session.user)
  console.log('sessionUser inside group form', sessionUser)

  console.log('group inside of group form', group)

  const history = useHistory()

  if (formType === 'Edit Group') {
    if (!sessionUser || sessionUser.id !== group.organizerId) {
      history.push('/')
    }
  }


  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [location, setLocation] = useState(group.city ? `${group.city}, ${group.state}` : '');
  const [groupName, setGroupName] = useState(group.name? group.name : '')
  const [description, setDescription] = useState(group.about? group.about : '')
  const [groupType, setGroupType] = useState(group.type? group.type : '')
  const [isPrivate, setIsPrivate] = useState(group.private? group.private : '')
  const [imageUrl, setImageUrl] = useState(group.GroupImages? group.GroupImages[0].url : '')

  useEffect(() => {

      const newErrors = {};
      if (!location) newErrors['location'] = 'Location is required'
      if (!groupName) newErrors['groupName'] = 'Name is required'
      // console.log('description inside useEffect', description)
      if (description.length < 30) newErrors['description'] = 'Description must be at least 30 characters long'
      if (!groupType) newErrors['groupType'] = 'Group Type is required'
      if (isPrivate !== 'true' && isPrivate !== 'false') newErrors['isPrivate'] = 'Visibility type is required'
      if (!['png', 'jpg', 'jpeg'].includes(fileTypeCheck(imageUrl))) newErrors['imageUrl'] = 'Image URL must end in .png, .jpg, or .jpeg'
      setErrors(newErrors);

  }, [location, groupName, description, groupType, isPrivate, imageUrl, hasSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true);
    const errorArr = Object.values(errors)
    if (errorArr.length) return

    if (location !== '') {
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

      if (formType === 'Create Group') {
        const newGroup = await dispatch(makeNewGroupThunk(payload))
        history.push(`/groups/${newGroup.id}`)
      }

      if (formType === 'Edit Group') {
        delete payload.imageUrl
        const editedGroup = await dispatch(editGroupThunk(payload))
        history.push(`/groups/${editedGroup.id}`)
      }
    }

    setLocation('')
    setGroupName('')
    setDescription('')
    setGroupType('')
    setIsPrivate('')
    setImageUrl('')
    setErrors({})
    setHasSubmitted(false)

    // console.log('newGroup after dispatching to thunk', newGroup)
  }

  return(
    <div className='content'>
      <form className='new-group-form' onSubmit={handleSubmit}>
        <div className='header-container'>
          {formType === 'Create Group' ? (
            <>
              <h4>START A NEW GROUP</h4>
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
            className='user-input-on-group-form'
            required={true}
            placeholder="City, STATE"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          {hasSubmitted && errors.location && (<p className='errors'>{errors.location}</p>)}
        </div>

        <div className='name-container'>
          <h2>What will your group's name be?</h2>
          <p>
            Choose a name that will give people a clear idea of what the group is about.
            Feel free to get creative! You can edit this later if you change your mind.
          </p>
          <input
            type="text"
            className='user-input-on-group-form'
            required={true}
            placeholder="What is your group name?"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
          {hasSubmitted && errors.groupName && (<p className='errors'>{errors.groupName}</p>)}
        </div>

        <div className='about-container-on-group-form'>
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
            className='user-input-on-group-form-about-info'
            required={true}
            rows={10}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {hasSubmitted && errors.description && (<p className='errors'>{errors.description}</p>)}
        </div>

        <div className='final-steps-container'>
          <h2>Final steps...</h2>

          <p>Is this an in person or online group?</p>
          <select className='user-input-on-group-form' required value={groupType} onChange={e => setGroupType(e.target.value)}>
            <option value="">{'(select one)'}</option>
            <option value={'Online'}>Online</option>
            <option value={'In Person'}>In Person</option>
          </select>
          {hasSubmitted && errors.groupType && (<p className='errors'>{errors.groupType}</p>)}

          <p>Is this group private or public?</p>
          <select className='user-input-on-group-form' required value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
            <option value="">{'(select one)'}</option>
            <option value={true}>Private</option>
            <option value={false}>Public</option>
          </select>
          {hasSubmitted && errors.isPrivate && (<p className='errors'>{errors.isPrivate}</p>)}

          <p>
            Please add an image url for your group below:
          </p>
          <input
            type="text"
            className='user-input-on-group-form'
            required={true}
            placeholder="Image Url"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
          {hasSubmitted && errors.imageUrl && (<p className='errors'>{errors.imageUrl}</p>)}
        </div>
        <div className='submit-button'>
          <button type="submit">{formType === 'Create Group' ? 'Create Group' : 'Update Group' }</button>
        </div>

      </form>


    </div>

  )
}

export default GroupForm

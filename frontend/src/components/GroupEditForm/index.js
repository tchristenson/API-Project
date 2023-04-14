import GroupForm from "../GroupForm";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleGroupThunk } from "../../store/groups";

const EditGroupForm = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const [group, setGroup] = useState('');
  console.log('group inside of edit form', group)

  useEffect(() => {
    dispatch(getSingleGroupThunk(groupId))
    .then((data) => setGroup(data))

    // const data = await dispatch(getSingleGroupThunk(groupId))
    // setGroup(data)

  }, [dispatch])

  if (!group) return(<></>);

  console.log('group before sending to group form', group)

  return (
    Object.keys(group).length > 1 && (
      <>
        <GroupForm
          group={group}
          formType="Edit Group"
        />
      </>
    )
  );
}

export default EditGroupForm

import GroupForm from "../GroupForm";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { editGroupThunk } from "../../store/groups";

const EditGroupForm = () => {
  const { groupId } = useParams();
  const group = useSelector(state => state.groups[groupId]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(editGroupThunk(group))
  }, [dispatch])

  if (!group) return(<></>);

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

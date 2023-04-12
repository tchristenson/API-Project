import GroupForm from "../GroupForm";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { editGroupThunk } from "../../store/groups";

const EditGroupForm = () => {
  const { groupId } = useParams();
  let group = useSelector(state => state.groups[groupId]);
  console.log('group inside GroupEditForm', group)
  const dispatch = useDispatch()
  if (!group) return(<></>);

  group = {
    ...group,
    ['location']: `${group.city}, ${group.state}`,
    ['groupName']: group.name,
    ['description']: group.about,
    ['groupType']: group.type,
    ['isPrivate']: group.private,
  }

  console.log('group after key edits', group)


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

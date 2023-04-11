import GroupForm from "../GroupForm";

const CreateGroupForm = () => {
  const group = {
    location: '',
    groupName: '',
    description: '',
    groupType: '',
    isPrivate: '',
    imageUrl: ''
  };

  return (
  <GroupForm
    group={group}
    formType="Create Group"
  />
  );
};

export default CreateGroupForm;

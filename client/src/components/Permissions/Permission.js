import React from 'react';
import {TextInput} from 'components/common/Form';
import {
  usePermissionsDispatch,
  usePermissionsState,
} from 'contexts/Permissions';

const Permission = () => {
  const dispatch = usePermissionsDispatch();
  const {fields} = usePermissionsState();

  const _handleChangeName = (name) => {
    dispatch({type: 'SET_FIELD', key: 'name', name});
  };

  return (
    <TextInput
      field={fields.name}
      fullWidth
      label="Name"
      name="name"
      onChange={_handleChangeName}
      required
      variant="outlined"
    />
  );
};

export default Permission;

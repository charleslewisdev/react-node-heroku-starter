import React from 'react';
import {TextInput} from 'components/common/Form';
import {
  useOrganizationsDispatch,
  useOrganizationsState,
} from 'contexts/Organizations';

const Organization = () => {
  const dispatch = useOrganizationsDispatch();
  const {fields} = useOrganizationsState();

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

export default Organization;

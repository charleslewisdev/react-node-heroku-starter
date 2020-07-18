import React from 'react';
import {CheckboxGroup, TextInput} from 'components/common/Form';
import {useRolesDispatch, useRolesState} from 'contexts/Roles';
import {updateCheckboxGroupValues} from 'utils/form';

const Role = () => {
  const dispatch = useRolesDispatch();
  const {permissions, fields} = useRolesState();
  //const hasErrors = doesFormHaveErrors(fields);

  const _handleChangeName = (name) => {
    dispatch({type: 'SET_FIELD', key: 'name', name});
  };

  const _handleChangePermissions = ({target}) => {
    const {checked, value} = target;
    const Permissions = updateCheckboxGroupValues(
      permissions,
      fields.Permissions.value,
      checked,
      parseInt(value)
    );
    return dispatch({type: 'SET_FIELD', key: 'Permissions', Permissions});
  };

  return (
    <>
      <TextInput
        field={fields.name}
        fullWidth
        label="Name"
        name="name"
        onChange={_handleChangeName}
        required
        variant="outlined"
      />
      <CheckboxGroup
        field={fields.Permissions}
        label="Permissions"
        options={permissions}
        onChange={_handleChangePermissions}
      />
    </>
  );
};

export default Role;

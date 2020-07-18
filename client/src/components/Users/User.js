import React, {useEffect, useState} from 'react';
import {AuthToken, Select, TextInput} from 'components/common/Form';
import {useUsersDispatch, useUsersState} from 'contexts/Users';
import {getToken} from 'services/users';

const User = () => {
  const dispatch = useUsersDispatch();
  const {fields, roles} = useUsersState();

  const [token, setToken] = useState('');

  useEffect(() => {
    const _getToken = async () => {
      const uuid = fields.uuid || {value: ''};
      const {status, token} = await getToken(uuid.value);
      if (status === 200) {
        setToken(token);
      }
    };
    _getToken();
  }, [fields.uuid]);

  const _handleChangeUsername = (username) => {
    dispatch({type: 'SET_FIELD', key: 'username', username});
  };

  const _handleChangeEmail = (email) => {
    dispatch({type: 'SET_FIELD', key: 'email', email});
  };

  const _handleChangeRoleId = ({target}) => {
    const {value: roleId} = target;
    return dispatch({type: 'SET_FIELD', key: 'roleId', roleId});
  };

  return (
    <>
      <TextInput
        field={fields.username}
        fullWidth
        label="Username"
        name="username"
        onChange={_handleChangeUsername}
        required
        variant="outlined"
      />
      <TextInput
        field={fields.email}
        fullWidth
        label="Email"
        name="email"
        onChange={_handleChangeEmail}
        required
        variant="outlined"
      />
      <TextInput
        disabled
        field={fields.uuid}
        fullWidth
        label="UUID"
        name="uuid"
        variant="outlined"
      />
      <Select
        field={fields.roleId}
        label="Role"
        options={roles}
        onChange={_handleChangeRoleId}
      />
      <AuthToken label="API Token" value={token} />
    </>
  );
};

export default User;

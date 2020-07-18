import React, {useEffect} from 'react';
import toastr from 'toastr';
import {EditableTable} from 'components/common';
import {UsersProvider, useUsersDispatch, useUsersState} from 'contexts/Users';
import useHasPermission from 'hooks/useHasPermission';
import {getRoles} from 'services/roles';
import {addUser, getUsers, updateUser} from 'services/users';
import {getFormValues} from 'utils/form';
import User from './User';

const Users = () => {
  const dispatch = useUsersDispatch();
  const {lastUpdatedAt, list: users, selected, fields} = useUsersState();
  const hasPermission = useHasPermission();

  useEffect(() => {
    const _getUsers = async () => {
      const {users: list, status} = await getUsers();
      if (status === 200) {
        dispatch({type: 'SET_LIST', list});
      }
    };
    const _getRoles = async () => {
      const {roles, status} = await getRoles();
      if (status === 200) {
        dispatch({type: 'SET_ROLES', roles});
      }
    };
    _getUsers();
    _getRoles();
  }, [dispatch, lastUpdatedAt]);

  const _handleCloseEdit = () => {
    dispatch({type: 'SET_SELECTED', selected: null});
    dispatch({type: 'SET_IS_EDIT_OPEN', isEditOpen: false});
  };

  const _handleSaveEdit = async () => {
    const {id} = selected || {};
    const isNew = !id;
    const formValues = getFormValues(fields);
    const {status} = isNew
      ? await addUser(formValues)
      : await updateUser(id, formValues);
    if (status === 200) {
      toastr.success(`User ${isNew ? 'created' : 'updated'}`);
      dispatch({type: 'SET_LAST_UPDATED_AT', lastUpdatedAt: new Date()});
      _handleCloseEdit();
    }
  };

  const permissions = {
    canAdd: hasPermission('addUser'),
    canEdit: hasPermission('updateUser'),
    canDelete: hasPermission('deleteUser'),
  };

  return (
    <EditableTable
      columns={[
        {
          field: 'id',
          title: 'ID',
          defaultSort: 'asc',
          editable: 'never',
        },
        {
          title: 'Username',
          field: 'username',
          editable: 'never',
        },
        {
          title: 'Email',
          field: 'email',
          editable: 'never',
        },
        {
          title: 'Role',
          field: 'Role.name',
          editable: 'never',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          type: 'datetime',
          editable: 'never',
        },
        {
          title: 'Updated At',
          field: 'updatedAt',
          type: 'datetime',
          editable: 'never',
        },
      ]}
      data={users}
      title="Users"
      editComponent={User}
      onEditClose={_handleCloseEdit}
      onEditSave={_handleSaveEdit}
      permissions={permissions}
      useDispatch={useUsersDispatch}
      useState={useUsersState}
    />
  );
};

const Wrapper = (props) => {
  return (
    <UsersProvider>
      <Users {...props} />
    </UsersProvider>
  );
};

export default Wrapper;

import React, {useEffect} from 'react';
import toastr from 'toastr';
import {EditableTable} from 'components/common';
import {RolesProvider, useRolesDispatch, useRolesState} from 'contexts/Roles';
import useHasPermission from 'hooks/useHasPermission';
import {getPermissions} from 'services/permissions';
import {addRole, getRoles, updateRole} from 'services/roles';
import {getFormValues} from 'utils/form';
import Role from './Role';

const Roles = () => {
  const dispatch = useRolesDispatch();
  const {lastUpdatedAt, list: roles, selected, fields} = useRolesState();
  const hasPermission = useHasPermission();

  useEffect(() => {
    const _getPermissions = async () => {
      const {permissions, status} = await getPermissions();
      if (status === 200) {
        dispatch({type: 'SET_PERMISSIONS', permissions});
      }
    };
    const _getRoles = async () => {
      const {roles, status} = await getRoles();
      if (status === 200) {
        dispatch({type: 'SET_LIST', list: roles});
      }
    };
    _getPermissions();
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
      ? await addRole(formValues)
      : await updateRole(id, formValues);
    if (status === 200) {
      toastr.success(`Role ${isNew ? 'created' : 'updated'}`);
      dispatch({type: 'SET_LAST_UPDATED_AT', lastUpdatedAt: new Date()});
      _handleCloseEdit();
    }
  };

  const permissions = {
    canAdd: hasPermission('addRole'),
    canEdit: hasPermission('updateRole'),
    canDelete: hasPermission('deleteRole'),
  };

  return (
    <EditableTable
      columns={[
        {
          field: 'id',
          title: 'ID',
          editable: 'never',
        },
        {
          title: 'Name',
          field: 'name',
          defaultSort: 'asc',
          editable: 'never',
        },
        {
          title: 'Date Created',
          field: 'createdAt',
          type: 'datetime',
          editable: 'never',
        },
      ]}
      data={roles}
      editComponent={Role}
      onEditClose={_handleCloseEdit}
      onEditSave={_handleSaveEdit}
      permissions={permissions}
      useDispatch={useRolesDispatch}
      useState={useRolesState}
      title="Roles"
    />
  );
};

const Wrapper = (props) => {
  return (
    <RolesProvider>
      <Roles {...props} />
    </RolesProvider>
  );
};

export default Wrapper;

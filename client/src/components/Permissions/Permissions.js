import React, {useEffect} from 'react';
import toastr from 'toastr';
import {EditableTable} from 'components/common';
import {
  PermissionsProvider,
  usePermissionsDispatch,
  usePermissionsState,
} from 'contexts/Permissions';
import useHasPermission from 'hooks/useHasPermission';
import {
  addPermission,
  getPermissions,
  updatePermission,
} from 'services/permissions';
import {getFormValues} from 'utils/form';
import Permission from './Permission';

const Permissions = () => {
  const dispatch = usePermissionsDispatch();
  const {
    lastUpdatedAt,
    list: permissions,
    selected,
    fields,
  } = usePermissionsState();
  const hasPermission = useHasPermission();

  useEffect(() => {
    const _getPermissions = async () => {
      const {permissions: list, status} = await getPermissions();
      if (status === 200) {
        dispatch({type: 'SET_LIST', list});
      }
    };
    _getPermissions();
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
      ? await addPermission(formValues)
      : await updatePermission(id, formValues);
    if (status === 200) {
      toastr.success(`Permission ${isNew ? 'created' : 'updated'}`);
      dispatch({type: 'SET_LAST_UPDATED_AT', lastUpdatedAt: new Date()});
      _handleCloseEdit();
    }
  };

  const tablePermissions = {
    canAdd: hasPermission('addPermission'),
    canEdit: hasPermission('updatePermission'),
    canDelete: hasPermission('deletePermission'),
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
        },
        {
          title: 'Date Created',
          field: 'createdAt',
          type: 'datetime',
          editable: 'never',
        },
      ]}
      data={permissions}
      title="Permissions"
      editComponent={Permission}
      onEditClose={_handleCloseEdit}
      onEditSave={_handleSaveEdit}
      permissions={tablePermissions}
      useDispatch={usePermissionsDispatch}
      useState={usePermissionsState}
    />
  );
};

const Wrapper = (props) => {
  return (
    <PermissionsProvider>
      <Permissions {...props} />
    </PermissionsProvider>
  );
};

export default Wrapper;

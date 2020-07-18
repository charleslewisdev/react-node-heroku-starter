import React, {useEffect} from 'react';
import toastr from 'toastr';
import {EditableTable} from 'components/common';
import {
  OrganizationsProvider,
  useOrganizationsDispatch,
  useOrganizationsState,
} from 'contexts/Organizations';
import useHasPermission from 'hooks/useHasPermission';
import {
  addOrganization,
  getOrganizations,
  updateOrganization,
} from 'services/organizations';
import {getFormValues} from 'utils/form';
import Organization from './Organization';

const Organizations = () => {
  const dispatch = useOrganizationsDispatch();
  const {
    lastUpdatedAt,
    list: organizations,
    selected,
    fields,
  } = useOrganizationsState();
  const hasPermission = useHasPermission();

  useEffect(() => {
    const _getOrganizations = async () => {
      const {organizations, status} = await getOrganizations();
      if (status === 200) {
        dispatch({type: 'SET_LIST', list: organizations});
      }
    };
    _getOrganizations();
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
      ? await addOrganization(formValues)
      : await updateOrganization(id, formValues);
    if (status === 200) {
      toastr.success(`Organization ${isNew ? 'created' : 'updated'}`);
      dispatch({type: 'SET_LAST_UPDATED_AT', lastUpdatedAt: new Date()});
      _handleCloseEdit();
    }
  };

  const permissions = {
    canAdd: hasPermission('addOrganization'),
    canEdit: hasPermission('updateOrganization'),
    canDelete: hasPermission('deleteOrganization'),
  };

  return (
    <>
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
        data={organizations}
        editComponent={Organization}
        onEditClose={_handleCloseEdit}
        onEditSave={_handleSaveEdit}
        permissions={permissions}
        useDispatch={useOrganizationsDispatch}
        useState={useOrganizationsState}
        title="Organizations"
      />
    </>
  );
};

const Wrapper = (props) => {
  return (
    <OrganizationsProvider>
      <Organizations {...props} />
    </OrganizationsProvider>
  );
};

export default Wrapper;

import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import {EditDialog} from 'components/common';
import {TABLE_ICONS} from 'constants/STYLES';

const EditableTable = ({
  editComponent,
  permissions = {},
  onEditClose,
  onEditSave,
  useDispatch,
  useState,
  ...others
}) => {
  const dispatch = useDispatch();
  const {isEditOpen, selected} = useState();

  const EditComponent = editComponent;
  const isNew = !selected;

  const _handleClickAdd = () => {
    dispatch({type: 'SET_SELECTED', selected: null});
    dispatch({type: 'SET_IS_EDIT_OPEN', isEditOpen: true});
  };

  const _handleClickDelete = (_, selected) => {
    //
  };

  const _handleClickEdit = (_, selected) => {
    dispatch({type: 'SET_SELECTED', selected});
    dispatch({type: 'SET_IS_EDIT_OPEN', isEditOpen: true});
  };

  return (
    <>
      <div style={{maxWidth: '100%'}}>
        <MaterialTable
          icons={TABLE_ICONS}
          localization={{
            header: {
              actions: '',
            },
          }}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
          }}
          onRowClick={_handleClickEdit}
          actions={[
            {
              icon: TABLE_ICONS.Add,
              tooltip: 'Add',
              isFreeAction: true,
              onClick: _handleClickAdd,
              hidden: !permissions.canAdd,
            },
            {
              icon: TABLE_ICONS.Edit,
              tooltip: 'Edit',
              onClick: _handleClickEdit,
              hidden: !permissions.canEdit,
            },
            {
              icon: TABLE_ICONS.Delete,
              tooltip: 'Delete',
              onClick: _handleClickDelete,
              hidden: !permissions.canDelete,
            },
          ]}
          {...others}
        />
      </div>
      <EditDialog
        action={isNew ? 'Create' : 'Edit'}
        onClose={onEditClose}
        onSave={onEditSave}
        isOpen={isEditOpen}
      >
        <EditComponent />
      </EditDialog>
    </>
  );
};

EditableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  editComponent: PropTypes.func.isRequired,
  onEditClose: PropTypes.func.isRequired,
  onEditSave: PropTypes.func.isRequired,
  useDispatch: PropTypes.func.isRequired,
  useState: PropTypes.func.isRequired,
};

export default EditableTable;

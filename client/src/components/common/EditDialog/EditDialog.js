import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const EditDialog = ({
  action = 'Edit',
  children,
  objectName = '',
  onClose,
  onSave,
  isOpen,
  maxWidth = 'md',
  ...others
}) => {
  const title = action + ' ' + objectName;

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      onBackdropClick={onClose}
      onEscapeKeyDown={onClose}
      open={isOpen}
      {...others}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditDialog;

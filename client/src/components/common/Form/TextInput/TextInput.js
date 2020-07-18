import React from 'react';
import {TextField} from '@material-ui/core';
import {useHasPermission} from 'hooks';

const TextInput = ({
  field,
  label,
  name,
  onChange,
  editPermission,
  viewPermission,
  ...additionalProps
}) => {
  const hasPermission = useHasPermission();
  const canEdit = editPermission ? hasPermission(editPermission) : true;
  const canView = viewPermission ? hasPermission(viewPermission) : true;
  return (
    canView && (
      <TextField
        disabled={!canEdit}
        {...field.validation}
        label={label}
        onChange={({target}) => onChange(target.value)}
        value={field.value || ''}
        {...additionalProps}
      />
    )
  );
};

export default TextInput;

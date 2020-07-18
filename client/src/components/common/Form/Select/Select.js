import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';
import useStyles from './styles';

const Select = ({
  field,
  label,
  labelKey = 'name',
  onChange,
  options,
  valueKey = 'id',
}) => {
  const styles = useStyles();
  const value = field.value || '';
  const labelId = `InputLabel-Select-${label}`;
  return (
    <FormControl className={styles.Select}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect id={label} labelId={labelId} onChange={onChange} value={value}>
        {options.map((option, i) => {
          return (
            <MenuItem key={i} value={option[valueKey]}>
              {option[labelKey]}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

Select.propTypes = {
  field: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;

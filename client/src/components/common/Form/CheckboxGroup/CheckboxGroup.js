import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

const _isChecked = (values, thisValue, valueKey) => {
  return !!values.find((obj) => obj[valueKey] === thisValue);
};

const CheckboxGroup = ({
  field,
  label,
  options,
  labelKey = 'name',
  valueKey = 'id',
  onChange,
}) => {
  const values = field.value || [];

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option, i) => {
          const _label = option[labelKey];
          const _value = option[valueKey];
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={_isChecked(values, _value, valueKey)}
                  onChange={onChange}
                  value={_value}
                />
              }
              key={i}
              label={_label}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;

import {addOrUpdateObjById, getObjById, removeObjById} from './array';

export const doesFormHaveErrors = (fields) => {
  const entries = Object.entries(fields);
  return entries.reduce((acc, [key, value]) => {
    return acc || value.validation.error;
  }, false);
};

export const getInitialFieldsState = (fieldsProps) => {
  return fieldsProps.reduce((acc, {key}) => {
    acc[key] = {
      isModified: false,
      validation: {
        error: false,
        helperText: '',
      },
      value: null,
    };
    return acc;
  }, {});
};

export const getFormValues = (fields) => {
  const entries = Object.entries(fields);
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});
};

export const isFormModified = (fields) => {
  const entries = Object.entries(fields);
  return entries.reduce((acc, [key, value]) => {
    return acc || value.isModified;
  }, false);
};

export const updateFieldValue = (state, action, key, filterFn, validateFn) => {
  const shouldUpdate = filterFn(key, action[key]);
  if (!shouldUpdate) {
    return {
      [key]: state[key],
    };
  }
  const validation = validateFn(key, action[key]);
  return {
    [key]: {
      ...state[key],
      isModified: true,
      validation,
      value: action[key],
    },
  };
};

export const updateFieldsValues = (fields, selected, fieldsProps) => {
  return fieldsProps.reduce((acc, {key}) => {
    acc[key] = {
      ...acc[key],
      value: selected[key] || '',
    };
    return acc;
  }, fields);
};

/*
export const setFieldsValues = (state, action, fields) => {
  return fields.reduce((acc, field) => {
    acc[field] = {
      ...acc[field],
      value: action[field],
    };
    return acc;
  }, state);
};
*/
export const updateCheckboxGroupValues = (all, selected, isChecked, id) => {
  if (isChecked) {
    return addOrUpdateObjById(selected, id, getObjById(all, id));
  } else {
    return removeObjById(selected, id);
  }
};

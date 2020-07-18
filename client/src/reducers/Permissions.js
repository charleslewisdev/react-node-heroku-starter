import {
  getInitialFieldsState,
  updateFieldsValues,
  updateFieldValue,
} from 'utils/form';
import {hasLength} from 'utils/string';

const FIELDS_PROPS = [{key: 'name'}];

const initialState = {
  isEditOpen: false,
  lastUpdatedAt: null,
  list: [],
  selected: null,
  fields: getInitialFieldsState(FIELDS_PROPS),
};

const _filterInput = (key, value) => {
  if (!hasLength(value)) {
    return true;
  }
  switch (key) {
    default:
      return true;
  }
};

const _validateInput = (key, value) => {
  switch (key) {
    case 'name':
      if (!hasLength(value)) {
        return {
          error: true,
          helperText: 'Name is required',
        };
      }
      return {
        error: false,
        helperText: '',
      };
    default:
      return {
        error: false,
        helperText: '',
      };
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_EDIT_OPEN':
      return {
        ...state,
        isEditOpen: action.isEditOpen,
      };
    case 'SET_LAST_UPDATED_AT':
      return {
        ...state,
        lastUpdatedAt: action.lastUpdatedAt,
      };
    case 'SET_LIST':
      return {
        ...state,
        list: action.list,
      };
    case 'SET_SELECTED':
      const _fields = action.selected
        ? updateFieldsValues(state.fields, action.selected, FIELDS_PROPS)
        : getInitialFieldsState(FIELDS_PROPS);
      return {
        ...state,
        selected: action.selected,
        fields: _fields,
      };
    case 'SET_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          ...updateFieldValue(
            state,
            action,
            action.key,
            _filterInput,
            _validateInput
          ),
        },
      };
    default:
      return state;
  }
};

export {initialState, reducer};

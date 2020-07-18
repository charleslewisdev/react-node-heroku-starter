import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import {TABLE_ICONS} from 'constants/STYLES';

const Table = (props) => {
  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable icons={TABLE_ICONS} {...props} />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;

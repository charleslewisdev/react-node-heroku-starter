import React from 'react';
import {TextField} from '@material-ui/core';
import {CopyToClipboardButton} from 'components/common';
import useStyles from './styles';

const AuthToken = ({label, value, ...additionalProps}) => {
  const styles = useStyles();

  return (
    <div className={styles.AuthToken}>
      <TextField
        disabled={true}
        fullWidth
        label={label}
        value={value}
        {...additionalProps}
      />
      <CopyToClipboardButton text={value} />
    </div>
  );
};

export default AuthToken;

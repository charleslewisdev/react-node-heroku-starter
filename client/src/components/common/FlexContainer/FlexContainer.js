import React from 'react';
import useStyles from './styles';

const FlexContainer = ({children}) => {
  const styles = useStyles();

  return <div className={styles.FlexContainer}>{children}</div>;
};

export default FlexContainer;

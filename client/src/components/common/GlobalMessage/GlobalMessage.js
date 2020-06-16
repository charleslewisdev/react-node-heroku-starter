import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@material-ui/core/styles';

const GlobalMessage = ({text}) => {
  const StyledDiv = styled('div')({
    padding: '5%',
    textAlign: 'center',
    fontSize: '2rem',
  });

  return <StyledDiv>{text}</StyledDiv>;
};

GlobalMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default GlobalMessage;

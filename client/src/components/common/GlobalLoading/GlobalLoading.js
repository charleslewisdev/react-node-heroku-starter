import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {styled} from '@material-ui/core/styles';
import {GlobalMessage} from 'components/common';

const TIMEOUT_INTERVAL = 10000;
const TIMEOUT_MESSAGE = 'Request timed out.';

const GlobalLoading = () => {
  const StyledDiv = styled('div')({
    padding: '5%',
    textAlign: 'center',
  });

  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, TIMEOUT_INTERVAL);

    return () => clearTimeout(timer);
  }, []);

  return isTimeout ? (
    <GlobalMessage text={TIMEOUT_MESSAGE} />
  ) : (
    <StyledDiv>
      <CircularProgress color="secondary" size="5em" />
    </StyledDiv>
  );
};

export default GlobalLoading;

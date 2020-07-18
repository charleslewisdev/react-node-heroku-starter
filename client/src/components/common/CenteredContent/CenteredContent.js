import React from 'react';
import {FlexContainer, SpacerColumn} from 'components/common';

const CenteredContent = ({children}) => {
  return (
    <FlexContainer>
      <SpacerColumn />
      <div style={{maxWidth: '80vw', paddingTop: '2rem'}}>{children}</div>
      <SpacerColumn />
    </FlexContainer>
  );
};

export default CenteredContent;

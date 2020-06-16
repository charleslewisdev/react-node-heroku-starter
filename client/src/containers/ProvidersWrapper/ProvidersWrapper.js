import React from 'react';
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {LoginProvider} from 'contexts/Login';
import {MenuProvider} from 'contexts/MenuDrawer';
import muiTheme from 'muiTheme';

const ProvidersWrapper = ({children}) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <LoginProvider>
          <MenuProvider>{children}</MenuProvider>
        </LoginProvider>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default ProvidersWrapper;

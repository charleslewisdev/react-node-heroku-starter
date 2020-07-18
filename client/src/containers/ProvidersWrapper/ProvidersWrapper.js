import React from 'react';
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {LoginProvider} from 'contexts/Login';
import {MenuProvider} from 'contexts/MenuDrawer';
import {SecurityProvider} from 'contexts/Security';
import muiTheme from 'muiTheme';

const ProvidersWrapper = ({children}) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <LoginProvider>
          <SecurityProvider>
            <MenuProvider>{children}</MenuProvider>
          </SecurityProvider>
        </LoginProvider>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default ProvidersWrapper;

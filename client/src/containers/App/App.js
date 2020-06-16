import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import clsx from 'clsx';
import {AppBar, Home, Login, MenuDrawer, NotFound} from 'components';
import ProtectedRoute from 'components/common/ProtectedRoute';
import ProvidersWrapper from 'containers/ProvidersWrapper';
import {useMenuState} from 'contexts/MenuDrawer';
import useStyles from './App.styles';

const AppMain = ({children}) => {
  const classes = useStyles();

  const {isDrawerOpen} = useMenuState();

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: isDrawerOpen,
      })}
    >
      <div className={classes.drawerHeader} />
      {children}
    </main>
  );
};

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <ProvidersWrapper>
        <Router>
          <AppBar />
          <MenuDrawer />
          <AppMain>
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute exact path="/" Component={Home} />
              {/* This is placed last to catch all routes not defined above */}
              <ProtectedRoute Component={NotFound} />
            </Switch>
          </AppMain>
        </Router>
      </ProvidersWrapper>
    </div>
  );
};

export default App;

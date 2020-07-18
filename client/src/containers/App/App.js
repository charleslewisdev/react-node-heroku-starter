import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  Home,
  Login,
  MenuDrawer,
  NotFound,
  Organizations,
  Permissions,
  Roles,
  Users,
} from 'components';
import ProtectedRoute from 'components/common/ProtectedRoute';
import ProvidersWrapper from 'containers/ProvidersWrapper';
import {useLoginState} from 'contexts/Login';
import {useMenuState} from 'contexts/MenuDrawer';
import {useSecurityDispatch} from 'contexts/Security';
import {getUserPermissions} from 'services/auth';
import useStyles from './styles';

const AppMain = ({children}) => {
  const classes = useStyles();

  const {isDrawerOpen} = useMenuState();

  const {isLoggedIn} = useLoginState();
  const dispatch = useSecurityDispatch();

  useEffect(() => {
    const _getUserPermissions = async () => {
      const {permissions, role, status} = await getUserPermissions();
      if (status === 200) {
        dispatch({type: 'SET_PERMISSIONS', permissions});
        dispatch({type: 'SET_ROLE', role});
      }
    };
    if (isLoggedIn) {
      _getUserPermissions();
    }
  }, [dispatch, isLoggedIn]);

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
              <ProtectedRoute exact path="/roles" Component={Roles} />
              <ProtectedRoute
                exact
                path="/permissions"
                Component={Permissions}
              />
              <ProtectedRoute exact path="/users" Component={Users} />
              <ProtectedRoute
                exact
                path="/organizations"
                Component={Organizations}
              />
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

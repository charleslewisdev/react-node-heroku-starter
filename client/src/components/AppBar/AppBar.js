import React from 'react';
import {Link} from 'react-router-dom';
import {
  AppBar as MAppBar,
  IconButton,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {AccountMenu} from 'components/common';
import {useLoginState} from 'contexts/Login';
import {useMenuDispatch, useMenuState} from 'contexts/MenuDrawer';
import useStyles from './styles';
import {APP_NAME} from '../../constants';

const AppBar = ({children}) => {
  const styles = useStyles();

  const {isLoggedIn} = useLoginState();
  const dispatch = useMenuDispatch();
  const {isDrawerOpen} = useMenuState();

  const _handleToggleNavClick = () => {
    dispatch({type: 'SET_IS_DRAWER_OPEN', isDrawerOpen: !isDrawerOpen});
  };

  return (
    <MAppBar className={styles.AppBar} position="fixed">
      <Toolbar variant="dense">
        <div className="AppBar-left">
          <Tooltip title="Toggle Menu">
            <IconButton
              aria-label="menu"
              edge="start"
              onClick={_handleToggleNavClick}
            >
              <Menu />
            </IconButton>
          </Tooltip>
          <Link to="/">{APP_NAME}</Link>
        </div>
        <div className="AppBar-center">{children}</div>
        <div className="AppBar-right">
          {/*
            These items will actually be displayed in reverse order
            because we are using a row-reverse flexbox to float them right
          */}
          {isLoggedIn && <AccountMenu />}
        </div>
      </Toolbar>
    </MAppBar>
  );
};

export default AppBar;

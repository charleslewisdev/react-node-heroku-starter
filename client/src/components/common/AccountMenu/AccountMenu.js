import React, {useState} from 'react';
import {IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import {logout} from 'utils/auth';

const AccountMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const _handleClick = ({currentTarget}) => {
    setMenuAnchor(currentTarget);
  };

  const _handleClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <Tooltip title="Account">
        <IconButton aria-label="menu" edge="start" onClick={_handleClick}>
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={_handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;

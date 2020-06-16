import React, {useState} from 'react';
import {IconButton, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {Settings} from '@material-ui/icons';

const SettingsMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const _handleClick = ({currentTarget}) => {
    setMenuAnchor(currentTarget);
  };

  const _handleClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <Tooltip title="Settings">
        <IconButton aria-label="menu" edge="start" onClick={_handleClick}>
          <Settings />
        </IconButton>
      </Tooltip>
      <Menu
        id="settings-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={_handleClose}
      >
        <MenuItem>Placeholder</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;

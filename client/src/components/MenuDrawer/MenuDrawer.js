import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
  Avatar,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {useMenuState} from 'contexts/MenuDrawer';
import useHasPermission from 'hooks/useHasPermission';
import useStyles from './MenuDrawer.styles';
import MENU_ITEMS from '../../constants/MENU_ITEMS';

const MenuDrawer = () => {
  const classes = useStyles();

  const {isDrawerOpen} = useMenuState();
  const hasPermission = useHasPermission();

  const initialMenuItemsExpandState = MENU_ITEMS.reduce((acc, {name}) => {
    acc[name] = false;
    return acc;
  }, {});

  const [menuItemsExpandState, setMenuItemsExpandState] = useState(
    initialMenuItemsExpandState
  );

  const _handleNavMenuClick = (expandMenuItemName) => ({key, type}) => {
    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) return;

    if (expandMenuItemName) {
      setMenuItemsExpandState({
        ...menuItemsExpandState,
        [expandMenuItemName]: !menuItemsExpandState[expandMenuItemName],
      });
    }
  };

  const _buildMenu = () => (
    <div className={classes.list} role="presentation">
      <List dense={true}>
        {MENU_ITEMS.map((menuItem, index) => {
          const Icon = menuItem.icon;
          const canView = hasPermission(menuItem.viewPermission);
          if (!canView) {
            return <div key={index}></div>;
          }
          return (
            <div key={index}>
              <ListItem
                button
                onClick={_handleNavMenuClick(menuItem.name)}
                component={menuItem.linkTo ? Link : undefined}
                to={menuItem.linkTo}
              >
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={menuItem.displayName} />
                {menuItem.nestedItems &&
                  (menuItemsExpandState[menuItem.name] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItem>
              {menuItem.nestedItems && (
                <Collapse
                  in={menuItemsExpandState[menuItem.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" dense={true} disablePadding>
                    {menuItem.nestedItems.map((nestedItem) => {
                      const Icon = nestedItem.icon;
                      const ActionIcon = nestedItem.actionIcon;
                      return (
                        <ListItem
                          button
                          className={classes.nestedList}
                          key={`menuItem__${menuItem.name}__${nestedItem.name}`}
                          component={nestedItem.linkTo ? Link : undefined}
                          to={nestedItem.linkTo}
                        >
                          {Icon && (
                            <ListItemAvatar>
                              <Avatar>
                                <Icon fontSize="small" />
                              </Avatar>
                            </ListItemAvatar>
                          )}
                          <ListItemText primary={nestedItem.displayName} />
                          {ActionIcon && (
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label={nestedItem.actionIconLabel}
                                onClick={nestedItem.actionIconOnClick}
                              >
                                <ActionIcon fontSize="small" />
                              </IconButton>
                            </ListItemSecondaryAction>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {index === MENU_ITEMS.length - 1 ? null : <Divider />}
            </div>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
        open={isDrawerOpen}
        variant="persistent"
      >
        <div className={classes.toolbar} />
        {_buildMenu()}
        <Divider />
      </Drawer>
    </>
  );
};

export default MenuDrawer;

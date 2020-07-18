import {Business, Group, GroupWork, Home, HowToReg} from '@material-ui/icons';

export default [
  {
    displayName: 'Home',
    name: 'home',
    icon: Home,
    linkTo: '/',
  },
  {
    displayName: 'Permissions',
    name: 'permissions',
    icon: HowToReg,
    linkTo: '/permissions',
    viewPermission: 'getPermissions',
  },
  {
    displayName: 'Roles',
    name: 'roles',
    icon: GroupWork,
    linkTo: '/roles',
    viewPermission: 'getRoles',
  },
  {
    displayName: 'Users',
    name: 'users',
    icon: Group,
    linkTo: '/users',
    viewPermission: 'getUsers',
  },
  {
    displayName: 'Organizations',
    name: 'organizations',
    icon: Business,
    linkTo: '/organizations',
    viewPermission: 'getOrganizations',
  },
];

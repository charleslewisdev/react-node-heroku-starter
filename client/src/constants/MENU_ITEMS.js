import {Home} from '@material-ui/icons';

export default [
  {
    displayName: 'Home',
    name: 'home',
    icon: Home,
    linkTo: '/',
  },
  {
    displayName: 'Login',
    name: 'login',
    icon: Home,
    linkTo: '/login',
  },
  {
    displayName: 'Top Level Item',
    name: 'home',
    icon: Home,
    nestedItems: [
      {
        displayName: 'Nested Item 1',
        name: 'nestedItem1',
        icon: Home,
        linkTo: '/',
      },
      {
        displayName: 'Nested Item 2',
        name: 'nestedItem2',
        icon: Home,
        linkTo: '/',
      },
    ],
  },
];

import {makeStyles} from '@material-ui/core/styles';
import {MENU_DRAWER_WIDTH} from '../../constants/STYLES';

export default makeStyles((theme) => ({
  app: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -MENU_DRAWER_WIDTH,
    width: 1,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: 48,
  },
}));

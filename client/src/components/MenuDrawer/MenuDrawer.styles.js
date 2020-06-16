import {makeStyles} from '@material-ui/core/styles';
import {APP_BAR_HEIGHT, MENU_DRAWER_WIDTH} from '../../constants/STYLES';

export default makeStyles((theme) => ({
  drawer: {
    width: MENU_DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    width: MENU_DRAWER_WIDTH,
  },
  list: {
    marginTop: APP_BAR_HEIGHT,
  },
  nestedList: {
    paddingLeft: theme.spacing(4),
  },
}));

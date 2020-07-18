import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  AppBar: {
    display: 'flex',
    zIndex: 1201,
    '& a': {
      color: theme.palette.primary.contrastText,
      fontSize: '1.4rem',
      fontWeight: theme.typography.fontWeightBold,
      textDecoration: 'none',
      '& img': {
        height: 40,
      },
    },
    '& .MuiIconButton-root': {
      padding: '0 12px 0 12px',
      '& svg': {
        height: 40,
        width: 40,
      },
    },
    '& .AppBar-center': {
      flexGrow: 2,
    },
    '& .AppBar-left': {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
    },
    '& .AppBar-right': {
      display: 'flex',
      flexDirection: 'row-reverse',
      flexGrow: 1,
    },
  },
}));

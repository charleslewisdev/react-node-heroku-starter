import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    offscreen: {
      left: '-999em',
      position: 'absolute',
    },
  };
});

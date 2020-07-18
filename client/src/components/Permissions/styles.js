import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    AddPermission: {
      '& .MuiDialogContent-root': {
        minHeight: '50vh',
        '& .MuiFormControl-root': {
          marginBottom: 10,
          marginTop: 10,
          minWidth: '100%',
        },
        '& label': {
          marginBottom: 5,
          marginTop: 10,
        },
      },
    },
  };
});

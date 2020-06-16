import React from 'react';
import {Redirect} from 'react-router-dom';
import toastr from 'toastr';
import {Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useLoginDispatch, useLoginState} from 'contexts/Login';
import {login} from 'services/users';
import {setSession} from 'utils/auth';

const useStyles = makeStyles((theme) => {
  return {
    spacerColumn: {
      flexGrow: 1,
    },
    table: {
      display: 'flex',
      width: '100%',
    },
  };
});

const Login = ({location}) => {
  const dispatch = useLoginDispatch();
  const {isLoggedIn} = useLoginState();
  const styles = useStyles();

  const {referrer} = location.state || {referrer: {pathname: '/'}};

  const _handleSubmit = async () => {
    const token = await login();
    toastr.success('Login successful');
    setSession(token);
    dispatch({type: 'SET_IS_LOGGED_IN', isLoggedIn: true});
  };

  if (isLoggedIn) {
    return <Redirect to={referrer} />;
  }

  return (
    <div className={styles.table}>
      <div className={styles.spacerColumn} />
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          id="username"
          label="Username"
          autoFocus
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          id="password"
          label="Password"
          autoFocus
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={_handleSubmit}
        >
          Log In
        </Button>
      </div>
      <div className={styles.spacerColumn} />
    </div>
  );
};

export default Login;

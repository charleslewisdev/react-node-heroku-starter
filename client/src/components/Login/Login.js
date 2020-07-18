import React from 'react';
import {Redirect} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import toastr from 'toastr';
import {CenteredContent} from 'components/common';
import {useLoginDispatch, useLoginState} from 'contexts/Login';
import {login} from 'services/users';
import {setSession} from 'utils/auth';
import useStyles from './styles';

const CLIENT_ID =
  '834594867407-3n8jesva9gqcf09jp93i6ran7p772obj.apps.googleusercontent.com';

const Login = ({location}) => {
  const styles = useStyles();

  const dispatch = useLoginDispatch();
  const {isLoggedIn} = useLoginState();

  const {referrer} = location.state || {referrer: {pathname: '/'}};

  const _handleLoginFailure = (response) => {
    console.error(response);
    return toastr.error('Failed to login');
  };

  const _handleLoginSuccess = async ({profileObj}) => {
    if (profileObj) {
      const {status, token} = await login(profileObj);
      if (status === 200) {
        setSession(token);
        dispatch({type: 'SET_IS_LOGGED_IN', isLoggedIn: true});
        toastr.success('Login successful');
      }
    }
  };

  if (isLoggedIn) {
    return <Redirect to={referrer} />;
  }

  return (
    <CenteredContent>
      <div className={styles.GoogleLogin}>
        <GoogleLogin
          clientId={CLIENT_ID}
          onFailure={_handleLoginFailure}
          onSuccess={_handleLoginSuccess}
        />
      </div>
    </CenteredContent>
  );
};

export default Login;

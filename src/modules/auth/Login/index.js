import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { login, getAccountInfo } from 'src/store/reducers/auth';
import { requestFail } from 'src/utils/api';
import { capitalize } from 'src/utils';
import { LOGIN_REQUEST } from 'src/store/types';

import useStyles from './style';

function Login() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error: authError, status: authStatus } = useSelector(state => state.auth);

  const history = useHistory();

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(login({
      body: data,
      success: () => {
        dispatch(getAccountInfo());
        history.push('/ideas');
      },
    }));
  };

  const getErrorText = () => {
    return authError ?
      Object.keys(authError).map((key) => (
        <div key={key}>{`${capitalize(key)}: ${authError[key]}`}</div>
      )) : '';
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography className={classes.title}>Log In</Typography>
        
        <Box component="form" width="500px" paddingTop="64px" onSubmit={handleSubmit(onSubmit)}>
          {authStatus === requestFail(LOGIN_REQUEST) && (
            <Alert className={classes.errorPane} severity="error">
              <AlertTitle><strong>Error</strong></AlertTitle>
              {getErrorText()}
            </Alert>
          )}
          <Box width="100%">
            <Controller
              as={
                <TextField
                  type="email"
                  placeholder="Email"
                  error={!!errors.email}
                  fullWidth
                  autoFocus
                />
              }
              name="email"
              control={control}
              rules={{
                required: 'This field is required',
              }}
              defaultValue=""
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (<Typography className={classes.error} color="error">{message}</Typography>)}
            />
          </Box>
          <Box width="100%" marginTop="64px">
            <Controller
              as={
                <TextField
                  type="password"
                  placeholder="Password"
                  error={!!errors.password}
                  fullWidth
                />
              }
              name="password"
              control={control}
              rules={{
                required: 'This field is required',
              }}
              defaultValue=""
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (<Typography className={classes.error} color="error">{message}</Typography>)}
            />
          </Box>

          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="64px"
          >
            <Button
              type="submit"
              className={classes.submit}
              variant="contained"
              color="primary"
              disableElevation
            >
              LOG IN
            </Button>
            <Typography variant="body1">
              Don't have an account? 
              <Link className={classes.link} to="/signup">Create an account</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;

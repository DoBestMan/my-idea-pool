import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { signup, getAccountInfo } from 'src/store/reducers/auth';
import { requestFail } from 'src/utils/api';
import { capitalize } from 'src/utils';
import { SIGNUP_REQUEST } from 'src/store/types';

import useStyles from './style';

function Signup() {
  const classes = useStyles();

  const [submitting, setSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const { error: authError, status: authStatus } = useSelector(state => state.auth);

  const history = useHistory();

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setSubmitting(true);
    dispatch(signup({
      body: data,
      success: () => {
        dispatch(getAccountInfo({
          success: () => history.push('/ideas'),
        }));
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
        <Typography className={classes.title}>Sign Up</Typography>
        
        <Box component="form" width="500px" paddingTop="64px" onSubmit={handleSubmit(onSubmit)}>
          {authStatus === requestFail(SIGNUP_REQUEST) && (
            <Alert className={classes.errorPane} severity="error">
              <AlertTitle><strong>Error</strong></AlertTitle>
              {getErrorText()}
            </Alert>
          )}
          <Box width="100%">
            <Controller
              as={
                <TextField
                  placeholder="Name"
                  error={!!errors.name}
                  fullWidth
                  autoFocus
                />
              }
              name="name"
              control={control}
              rules={{
                required: 'This field is required',
              }}
              defaultValue=""
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (<Typography className={classes.error} color="error">{message}</Typography>)}
            />
          </Box>
          <Box width="100%" marginTop="64px">
            <Controller
              as={
                <TextField
                  type="email"
                  placeholder="Email"
                  error={!!errors.email}
                  fullWidth
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
              {submitting ? (
                <CircularProgress size={24} style={{ color: 'white' }} />
              ) : (
                'SIGN UP'
              )}
            </Button>
            <Typography variant="body1">
              Already have an account?
              <Link className={classes.link} to="/login">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Signup;

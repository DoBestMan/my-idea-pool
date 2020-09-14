import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  Typography,
} from '@material-ui/core';

import { logout } from 'src/store/reducers/auth';

import useStyles from './style';

import LogoImg from 'src/assets/images/logo.png';

function Navbar({ children }) {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => !!state.auth.me);
  const profile = useSelector(state => state.auth.me);

  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout({
      body: {
        'refresh_token': localStorage.getItem('refreshToken'),
      },
      success: () => history.push('/login'),
    }));
  };

  const drawer = (
    <Box height="100%" bgcolor="primary" margin="36px 26px">
      <Box className={classes.logoContainer}>
        <Box component="img" src={LogoImg} height="64px" alt="My Idea Pool" />
      </Box>
      <Box component="p" fontSize="16px" color="white" textAlign="center">
        The Idea Pool
      </Box>
      {isLoggedIn && (
        <>
          <Divider className={classes.divider} />
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box
              component="img"
              src={profile.avatar_url}
              width="64px"
              alt={profile.name}
              borderRadius="50%"
            />
            <Box marginY="8px" color="white">
              <Typography variant="h6">
                {profile.name}
              </Typography>
            </Box>
            <Typography className={classes.logout} variant="body1" onClick={handleLogout}>
              Log out
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Box className={classes.root}>
      <nav className={classes.drawer} aria-label="sidebar">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" className={classes.content}>
        {children}
      </Box>
    </Box>
  );
}

export default Navbar;

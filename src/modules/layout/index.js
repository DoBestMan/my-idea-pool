import React from 'react';
import {
  Box,
  Drawer,
} from '@material-ui/core';

import useStyles from './style';

import LogoImg from 'src/assets/images/logo.png';

function Navbar({ children }) {
  const classes = useStyles();

  const drawer = (
    <Box height="100%" bgcolor="primary">
      <Box className={classes.logoContainer}>
        <Box component="img" src={LogoImg} height="64px" alt="My Idea Pool" />
      </Box>
      <Box component="p" fontSize="16px" color="white" textAlign="center">
        The Idea Pool
      </Box>
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

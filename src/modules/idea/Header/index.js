import React from 'react';
import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';

import useStyles from './style';

function IdeasHeader({ onAdd }) {
  const classes = useStyles();

  return (
    <>
      <Box width="100%">
        <Box display="flex" justifyContent="space-between" paddingLeft="24px">
          <Typography variant="h4">
            My Ideas
          </Typography>
          <IconButton color="primary" onClick={onAdd}>
            <AddIcon className={classes.add} />
          </IconButton>
        </Box>
        <Divider className={classes.divider} />
      </Box>
    </>
  );
}

export default IdeasHeader;

import React from 'react';
import {
  Box,
  Button,
  Typography,
} from '@material-ui/core';

import useStyles from './style';

function ConfirmModal({ show, title, text, onConfirm, onCancel }) {
  const classes = useStyles();

  const handleClickPrevent = (event) => {
    event.stopPropagation();
  };

  if (!show) return null;

  return (
    <>
      <Box className={classes.root} onClick={onCancel}> 
        <Box className={classes.modal} onClick={handleClickPrevent}>
          <Typography variant="h4">{title}</Typography>
          <Box className={classes.modalContent}>
            {text}
          </Box>
          <Box display="flex" justifyContent="space-around">
            <Button className={classes.button} onClick={onCancel}>CANCEL</Button>
            <Button className={classes.button} color="primary" onClick={onConfirm}>OK</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ConfirmModal;

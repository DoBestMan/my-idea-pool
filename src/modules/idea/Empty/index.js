import React from 'react';
import { Box, Typography } from '@material-ui/core';

import BulbImg from 'src/assets/images/bulb.png';

function Empty() {
  return (
    <>
      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <img src={BulbImg} width="64px" alt="bulb" />
        <Box component={Typography} variant="h6" style={{ marginTop: '32px' }}>
          Got Ideas?
        </Box>
      </Box>
    </>
  )
}

export default Empty;

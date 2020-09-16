import React, { useState } from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Check as AddIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
} from '@material-ui/icons';

import useStyles from './style';

const OPTIONS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function IdeasList({ ideas, page, onNext, onPrev }) {
  const classes = useStyles();

  const [selectIndex, setSelectIndex] = useState(-1);

  const handleSubmit = () => {
    setSelectIndex(-1);
  };

  const handleCloseEdit = (index) => () => {
    if (selectIndex === index) {
      setSelectIndex(-1);
    } else {
      // Remove editing idea
    }
  };

  const handleSelectIndex = (index) => () => {
    setSelectIndex(index);
  };

  const renderRow = (idea, index) => {
    if (!idea.id || selectIndex === index) {
      return (
        <TableRow key={`IDEA_${index}`}>
          <TableCell>
            <Typography variant="body1" color="secondary">•</Typography>
          </TableCell>
          <TableCell>
            <TextField style={{ width: '100%' }} />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              margin="dense"
              select
              style={{ width: '100%' }}
            >
              {OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              margin="dense"
              select
              style={{ width: '100%' }}
            >
              {OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              margin="dense"
              select
              style={{ width: '100%' }}
            >
              {OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
          <TableCell>
            {Math.round((idea.impact + idea.ease + idea.confidence) / 3, 2)}
          </TableCell>
          <TableCell>
            <Box display="flex" justifyContent="space-between">
              <IconButton onClick={handleSubmit}>
                <AddIcon color="primary" />
              </IconButton>
              <IconButton onClick={handleCloseEdit(index)}>
                <CloseIcon color="secondary" />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      )
    }
    return (
      <TableRow key={idea.id} className={classes.tableRow}>
        <TableCell>
          <Typography variant="body1" color="secondary">•</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{idea.content}</Typography>
        </TableCell>
        <TableCell>
          {idea.impact}
        </TableCell>
        <TableCell>
          {idea.ease}
        </TableCell>
        <TableCell>
          {idea.confidence}
        </TableCell>
        <TableCell>
          {Math.round((idea.impact + idea.ease + idea.confidence) / 3 * 100) / 100}
        </TableCell>
        <TableCell>
          <Box className={classes.actions}>
            <IconButton onClick={handleSelectIndex(index)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton>
              <DeleteIcon color="primary" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    )
  };

  return (
    <>
      <Box marginTop="36px">
        <Table stickyHeader aria-label="ideas table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '40px' }}></TableCell>
              <TableCell></TableCell>
              <TableCell style={{ width: '100px' }}>Impact</TableCell>
              <TableCell style={{ width: '100px' }}>Ease</TableCell>
              <TableCell style={{ width: '100px' }}>Confidence</TableCell>
              <TableCell style={{ width: '60px' }}>Avg.</TableCell>
              <TableCell style={{ width: '130px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ideas.map(renderRow)}
          </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default IdeasList;

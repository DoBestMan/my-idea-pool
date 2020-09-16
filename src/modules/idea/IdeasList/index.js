import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import {
  createIdea,
  updateIdea,
  deleteIdea,
  discardNewIdea,
  updateField,
  setIdea,
} from 'src/store/reducers/idea';

import useStyles from './style';

const OPTIONS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function IdeasList({ ideas, page, onNext, onPrev }) {
  const classes = useStyles();

  const [selectIndex, setSelectIndex] = useState(-1);

  const dispatch = useDispatch();
  const { idea } = useSelector(state => state.idea);

  const handleSubmit = () => {
    if (selectIndex === -1) {
      dispatch(createIdea({
        body: idea,
      }));
    } else {
      dispatch(updateIdea({
        id: idea.id,
        body: idea,
      }));
      setSelectIndex(-1);
    }
  };

  const handleCloseEdit = (index) => () => {
    if (selectIndex === index) {
      dispatch(setIdea(null));
      setSelectIndex(-1);
    } else {
      // Remove editing idea
      dispatch(discardNewIdea());
    }
  };

  const handleSelectIndex = (index) => () => {
    setSelectIndex(index);
    dispatch(setIdea(ideas[index]));
  };

  const handleDeleteIdea = (index) => () => {
    dispatch(deleteIdea({
      id: ideas[index].id,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateField({
      key: name,
      value,
    }));
  }

  const renderRow = (item, index) => {
    if (!item.id || selectIndex === index) {
      return (
        <TableRow key={`IDEA_${index}`}>
          <TableCell>
            <Typography variant="body1" color="secondary">•</Typography>
          </TableCell>
          <TableCell>
            <TextField
              name="content"
              value={idea.content}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </TableCell>
          <TableCell>
            <TextField
              name="impact"
              value={idea.impact}
              variant="outlined"
              margin="dense"
              onChange={handleChange}
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
              name="ease"
              value={idea.ease}
              variant="outlined"
              margin="dense"
              onChange={handleChange}
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
              name="confidence"
              value={idea.confidence}
              variant="outlined"
              margin="dense"
              onChange={handleChange}
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
            {Math.round((idea.impact + idea.ease + idea.confidence) / 3 * 100) / 100}
          </TableCell>
          <TableCell>
            <Box display="flex" justifyContent="space-between">
              <IconButton disabled={!idea.content} onClick={handleSubmit}>
                <AddIcon color={!!idea.content ? 'primary' : 'disabled'} />
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
      <TableRow key={item.id} className={classes.tableRow}>
        <TableCell>
          <Typography variant="body1" color="secondary">•</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{item.content}</Typography>
        </TableCell>
        <TableCell>
          {item.impact}
        </TableCell>
        <TableCell>
          {item.ease}
        </TableCell>
        <TableCell>
          {item.confidence}
        </TableCell>
        <TableCell>
          {Math.round((item.impact + item.ease + item.confidence) / 3 * 100) / 100}
        </TableCell>
        <TableCell>
          {!idea && (
            <Box className={classes.actions}>
              <IconButton onClick={handleSelectIndex(index)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={handleDeleteIdea(index)}>
                <DeleteIcon color="primary" />
              </IconButton>
            </Box>
          )}
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

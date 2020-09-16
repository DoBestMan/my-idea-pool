import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';

function IdeasList({ ideas, page, onNext, onPrev }) {
  return (
    <>
      <Box marginTop="36px">
        <Table stickyHeader aria-label="ideas table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Impact</TableCell>
              <TableCell>Ease</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Avg.</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ideas.map((idea, index) => (
              <TableRow key={idea.id || `IDEA_${index}`}>
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
                  {(idea.impact + idea.ease + idea.confidence) / 3}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default IdeasList;

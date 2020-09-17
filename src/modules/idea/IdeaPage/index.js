import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, IconButton } from '@material-ui/core';
import {
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
} from '@material-ui/icons';

import Header from '../Header';
import Empty from '../Empty';
import IdeasList from '../IdeasList';
import { getIdeas, addNewIdea } from 'src/store/reducers/idea';

function IdeaPage() {
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const dispatch = useDispatch();
  const { ideas, idea } = useSelector(state => state.idea);

  const fetchIdeas = useCallback(() => {
    setIsLoaded(false);
    dispatch(getIdeas({
      params: { page },
      success: ({ data }) => {
        if (!data.length && page > 1) {
          setIsLastPage(true);
          setPage(page - 1);
          dispatch(getIdeas({
            params: { page: page - 1 },
            success: () => setIsLoaded(true),
          }))
        } else {
          setIsLoaded(true);
        }
      },
    }));
  }, [dispatch, page]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const handleAddNewIdea = () => {
    if (idea) return;
    dispatch(addNewIdea({
      content: '',
      impact: 10,
      ease: 10,
      confidence: 10,
    }));
  };

  const handleGoToNextPage = () => {
    setPage(page + 1);
  };

  const handleGoToPrevPage = () => {
    if (page > 1) {
      setIsLastPage(false);
      setPage(page - 1);
    }
  };

  return (
    <>
      <Header onAdd={handleAddNewIdea} />
      {isLoaded ? (
        <>
          {ideas.length > 0 ? (
            <>
              <IdeasList
                ideas={ideas}
                page={page}
                fetchIdeas={fetchIdeas}
              />
              <Box display="flex" justifyContent="center" my="16px">
                <Box display="flex" justifyContent="space-between" width="80px">
                  <IconButton disabled={page === 1} onClick={handleGoToPrevPage}>
                    <PrevIcon />
                  </IconButton>
                  <IconButton disabled={isLastPage} onClick={handleGoToNextPage}>
                    <NextIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          ) : (
            <Empty />
          )}
        </>
      ) : (
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress size={72} color="primary" />
        </Box>
      )}
    </>
  );
}

export default IdeaPage;

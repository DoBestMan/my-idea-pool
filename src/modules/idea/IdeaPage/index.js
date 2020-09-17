import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';

import Header from '../Header';
import Empty from '../Empty';
import IdeasList from '../IdeasList';
import { getIdeas, addNewIdea } from 'src/store/reducers/idea';

function IdeaPage() {
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);

  const dispatch = useDispatch();
  const { ideas } = useSelector(state => state.idea);

  const fetchIdeas = useCallback(() => {
    setIsLoaded(false);
    dispatch(getIdeas({
      params: { page },
      success: () => setIsLoaded(true),
    }));
  }, [dispatch, page]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const handleAddNewIdea = () => {
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
      setPage(page - 1);
    }
  };

  return (
    <>
      <Header onAdd={handleAddNewIdea} />
      {isLoaded ? (
        <>
          {ideas.length > 0 ? (
            <IdeasList
              ideas={ideas}
              page={page}
              fetchIdeas={fetchIdeas}
              onNext={handleGoToNextPage}
              onPrev={handleGoToPrevPage}
            />
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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';
import Empty from '../Empty';
import IdeasList from '../IdeasList';
import { getIdeas, addNewIdea } from 'src/store/reducers/idea';

function IdeaPage() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { ideas } = useSelector(state => state.idea);
  // const ideas = [
  //   { id: 1, content: '3D Print all your emails', impact: 10, ease: 10, confidence: 10 },
  //   { id: 2, content: 'Print 2D', impact: 9, ease: 8, confidence: 6 },
  // ];

  useEffect(() => {
    dispatch(getIdeas({
      params: { page },
    }));
  }, [dispatch, page]);

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
      {ideas.length > 0 ? (
        <IdeasList
          ideas={ideas}
          page={page}
          onNext={handleGoToNextPage}
          onPrev={handleGoToPrevPage}
        />
      ) : (
        <Empty />
      )}
    </>
  )
}

export default IdeaPage;

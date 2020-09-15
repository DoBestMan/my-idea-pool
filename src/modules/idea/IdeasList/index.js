import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../Header';
import Empty from '../Empty';
import { getIdeas } from 'src/store/reducers/idea';

function IdeasList() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIdeas({
      params: { page },
    }));
  }, [dispatch, page]);

  return (
    <>
      <Header onAdd={() => {}} />
      <Empty />
    </>
  )
}

export default IdeasList;

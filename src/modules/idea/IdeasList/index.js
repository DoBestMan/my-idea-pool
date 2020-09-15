import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
      <h4>Ideas List</h4>
    </>
  )
}

export default IdeasList;
